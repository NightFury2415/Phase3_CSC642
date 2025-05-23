export default function AboutPage() {
  return (
    <div className="flex-1">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>

          <h2 className="text-xl font-semibold mb-6">Meet the Team:</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-black text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Dev Modi</h3>
              <p className="text-sm">
                I'm a passionate and results-driven Computer Science
                undergraduate at San Francisco State University with a strong
                foundation in full-stack software development and game design.
                Through hands-on internships and personal projects, I've gained
                practical experience building scalable applications using
                JavaScript, React, Node.js, MongoDB, and Django. I’ve led and
                contributed to projects ranging from AI-powered tools and job
                automation platforms to 2D/3D educational and horror games in
                Unity using C#. I enjoy turning complex ideas into user-focused,
                real-world solutions and thrive in environments that challenge
                me to learn fast, think critically, and build with purpose.
              </p>
              <p className="text-sm mt-4">
                I&apos;ve led and contributed to projects that improved user
                experience, streamlined operations, and increased efficiency at
                SF State, Google, MongoDB, and other prestigious companies.
              </p>
            </div>

            <div className="bg-black text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Naing Htet</h3>
              <p className="text-sm">
                I&apos;m a senior and a dedicated and purpose-driven computer science student
                at San Francisco State University with a strong interest in
                software engineering and full-stack development. My experience
                in backend and frontend technologies and curiosity has led me to
                participate in meaningful projects that aim to solve real-world
                challenges.
              </p>
              <p className="text-sm mt-4">
                I&apos;ve mentored students through beta and HackSFSU, served as
                a campus representative, and contributed to projects ranging
                from data visualization to machine learning applications. My
                work with Python, React, Node.js, and MongoDB has helped create
                solutions that meet client requirements and exceed expectations.
              </p>
            </div>

            <div className="bg-black text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Ehab Almaznai</h3>
              <p className="text-sm">
                I'm a 4th year student in San Francisco State University. I am a
                hard working student who wants to achieve big goals. I enjoy
                learning and finding new methods and enjoying gaining new
                knowledge.
              </p>
            </div>

            <div className="bg-black text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Thanh duong</h3>
              <p className="text-sm">
                I am the 4th year student in San Francisco State University. I
                am a Front-end web developer specializing in React and Tailwind
                CSS. I committed to create user-friendly UI with clean code.
              </p>
            </div>

            <div className="bg-black text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Eduardo Rodriguez</h3>
              <p className="text-sm">
                I am a 4th year Computer Science student at SFSU with an
                interest in Software development in Software Development and IT
                trouble shooting.Throughout my studies, I’ve gained practical
                experience with technologies like Docker, MySQL, Node.js, React,
                and Python. I enjoy working on projects that challenge me to
                think critically and improve my skills.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
