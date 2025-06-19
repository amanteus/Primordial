from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def sales_page():
    # Você pode passar variáveis do Python para o HTML aqui se precisar no futuro
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)