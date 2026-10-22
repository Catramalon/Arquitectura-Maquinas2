from flask import Flask, render_template

app = Flask(__name__)

# Ruta para el Dashboard Principal
@app.route('/')
@app.route('/Principal.html')
def dashboard():
    return render_template('Principal.html')

# Ruta dinámica para las 7 unidades (Uni1.html, Uni2.html, etc.)
@app.route('/Uni<int:id_unidad>.html')
def unidad(id_unidad):
    if 1 <= id_unidad <= 7:
        return render_template(f'Uni{id_unidad}.html')
    return "Unidad no encontrada", 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)