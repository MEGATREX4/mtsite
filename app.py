from flask import Flask, render_template, request, redirect
import json

app = Flask(__name__)


# Load data from JSON files
def load_data():
    with open('tab_names.json', 'r', encoding='utf-8') as f:
        tab_names = json.load(f)

    with open('images.json', 'r', encoding='utf-8') as f:
        images_data = json.load(f)

    return tab_names, images_data

# Save data to JSON files
def save_data(tab_names, images_data):
    with open('tab_names.json', 'w', encoding='utf-8') as f:
        json.dump(tab_names, f, ensure_ascii=False, indent=4)

    with open('images.json', 'w', encoding='utf-8') as f:
        json.dump(images_data, f, ensure_ascii=False, indent=4)

# Index route
@app.route('/')
def index():
    tab_names, images_data = load_data()

    # Pass all images data to the template
    return render_template('index.html', tab_names=tab_names, images_data=images_data)

# Add category route
@app.route('/add_category', methods=['POST'])
def add_category():
    tab_names, images_data = load_data()
    en_name = request.form.get('category').strip().replace(" ", "_")
    en_title = request.form.get('title').strip().capitalize()
    uk_name = request.form.get('uk_name').strip().replace(" ", "_")
    uk_title = request.form.get('uk_title').strip().capitalize()

    tab_names['en'][en_name] = en_title
    tab_names['uk'][uk_name] = uk_title
    save_data(tab_names, images_data)

    # Debug messages for the terminal
    print(f"Added category: {en_name} / {uk_name}")
    print(f"Current tab_names: {tab_names}")

    return redirect('/')

# Add this to your 'add_image' route in the Flask app

# Add image route
@app.route('/add_image', methods=['POST'])
def add_image():
    tab_names, images_data = load_data()
    selected_category = request.form.get('selected_category').strip()  # Trim whitespace

    element = {
        "url": request.form.get('image'),
        "category": request.form.get('category'),
    }

    # Ensure the selected category is not empty
    if selected_category:
        # Ensure the selected category exists in images_data
        if selected_category not in images_data:
            images_data[selected_category] = {"galeryimages": []}

        # Append the element to the existing galeryimages in the selected category
        images_data[selected_category]["galeryimages"].append(element)
    else:
        # If the category is empty, add the element to the galeryimages directly
        images_data["galeryimages"].append(element)

    # Optional fields
    optional_fields = ['desc', 'descen', 'text', 'texten', 'link']
    optional_data = {field: request.form.get(field) for field in optional_fields if request.form.get(field)}

    # Check if there is at least something in the description fields
    if any(optional_data.values()):
        element['description'] = optional_data

    # Save the changes to the JSON file
    save_data(tab_names, images_data)

    # Debug messages for the terminal
    print(f"Added element: {element}")
    print(f"Current images_data: {images_data}")

    return redirect('/')




# Add this route to your Flask app
@app.route('/display_elements')
def display_elements():
    tab_names, images_data = load_data()
    return render_template('display_elements.html', tab_names=tab_names, images_data=images_data)




if __name__ == '__main__':
    app.run(debug=True, host='192.168.0.105')
