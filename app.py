from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def sales_page():
    return render_template('index.html')

# ADICIONE ESTA NOVA ROTA
@app.route('style.css')
def serve_css():
    return render_template('style.css'), 200, {'Content-Type': 'text/css'}

if __name__ == '__main__':
    app.run(debug=True)
