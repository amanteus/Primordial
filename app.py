from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def sales_page():
    return render_template('index.html')

@app.route('/upsell')
def upsell_page():
    return render_template('upsell.html')

@app.route('/obrigado')
def thank_you_page():
    return render_template('obrigado.html')

# ADICIONE ESTA NOVA ROTA
@app.route('style.css')
def serve_css():
    return render_template('style.css'), 200, {'Content-Type': 'text/css'}

if __name__ == '__main__':
    app.run(debug=True)
