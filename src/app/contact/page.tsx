const Contact = () => {
  return (
    <div className="sectionPadding">
      <h1 className="text-4xl font-bold w-full text-center">Hi there</h1>
      <p className="font-semibold text-center max-w-4xl mx-auto my-4">
        My name is Mario, I am a 14 year old developer based in Romania and also the person who made
        this site! This website is only a demo for showcasing the functionality of an e-commerce
        website.
      </p>
      <p className="font-semibold text-lg text-center">
        If you wish to contact me you can{" "}
        <a
          href="https://mariodev.vercel.app/contact"
          referrerPolicy="no-referrer"
          target="_blank"
          className="text-red-600 hover:underline"
        >
          do it here.
        </a>
      </p>
    </div>
  );
};

export default Contact;
