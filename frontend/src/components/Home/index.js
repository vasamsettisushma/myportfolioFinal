import "./index.css"

const Home = () => {

    const onViewWork = () => {
        const section = document.getElementById("projects");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" }); // 🔥 smooth scroll to projects
        }
    };

    return (
        <>
            <div className="home">
                <div className="home-bg">
                    <div className="Portfolio-picture">
                        
                        <iframe src="https://drive.google.com/file/d/1XT4dgQxKkkCL7Waw4PKHD6Bz9mUAWt4r/preview" width="640" height="480" allow="autoplay"></iframe>
                       
                    </div>
                    <div className="porfolio-intro-text-container">
    <h1 className="portfolio-welcome-text">
        Hi, I’m <span className="porfolio-name-highlight">Sushma Vasamsetti</span>
    </h1>
    <p className="portfolio-intro-para">
        A curious mind with a passion for <span className="portfolio-intro-para-highlight">AI</span> 
        and a strong foundation in the <span className="portfolio-intro-para-highlight">MERN stack</span> 
        (MongoDB, Express.js, React, Node.js).  
        I enjoy transforming ideas into scalable, responsive, and efficient web applications 
        while seamlessly connecting front-end design with back-end logic.  
    </p>
    <button type="button" className="home-view-work-button" onClick={onViewWork}>
        Explore My Work
    </button>
</div>

                </div>
                <div className="scroll-indicator-container">
                    <p>Scroll Down</p>
                    <span className="arrow">&#8595;</span>
                </div>
            </div>
        </>
    )
}

export default Home