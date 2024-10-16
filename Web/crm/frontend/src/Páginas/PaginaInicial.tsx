import '../Css/Style_main_page.css';

const PaginaInicial = () => {
    return (
        <div>
            <header id="main-header">
              <img src="https://sanders.com.mx/wp-content/uploads/2022/12/logo.png.webp" alt="Sanders Logo" id="logo" />
            </header>

            <nav id="main-nav">
                <a href="/donaciones">Donaciones</a>
                <a href="/login">Iniciar Sesión</a>
                <a href='/registro'>Registro</a>
            </nav>

            <section id="vision-section">
                <h2>Visión</h2>
                <p>Esta es la sección de visión. Aquí puedes añadir la visión de tu organización.</p>
            </section>

            <section id="mision-section">
                <h2>Misión</h2>
                <p>Esta es la sección de misión. Aquí puedes añadir la misión de tu organización.</p>
            </section>

            <footer id="main-footer">
                <p>&copy; 2024 Mi Organización. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default PaginaInicial;