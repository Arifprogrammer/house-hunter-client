const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="footer p-10 my-container text-white">
        <div className="mx-auto lg:ml-0 text-center lg:text-start">
          <div className="mx-auto lg:ml-0">
            <h1 className="py-5 text-3xl text-white font-extrabold">
              House
              <span className="text-lime-400 font-extrabold italic text-xl -mt-6 pl-1">
                Hunter
              </span>
            </h1>
          </div>
          <p>
            House Hounter Industries Ltd.
            <br />
            Providing quality classes since 2012
          </p>
        </div>
        <div className="mx-auto lg:ml-0">
          <span className="footer-title mb-6 mx-auto lg:ml-0">Services</span>
          <a className="link link-hover mx-auto lg:ml-0">Branding</a>
          <a className="link link-hover mx-auto lg:ml-0">Design</a>
          <a className="link link-hover mx-auto lg:ml-0">Marketing</a>
          <a className="link link-hover mx-auto lg:ml-0">Advertisement</a>
        </div>
        <div className="mx-auto lg:ml-0">
          <span className="footer-title mb-6 mx-auto lg:ml-0">Company</span>
          <a className="link link-hover mx-auto lg:ml-0">About us</a>
          <a className="link link-hover mx-auto lg:ml-0">Contact</a>
          <a className="link link-hover mx-auto lg:ml-0">Jobs</a>
          <a className="link link-hover mx-auto lg:ml-0">Press kit</a>
        </div>
        <div className="mx-auto lg:ml-0">
          <span className="footer-title mb-6 mx-auto lg:ml-0">Legal</span>
          <a className="link link-hover mx-auto lg:ml-0">Terms of use</a>
          <a className="link link-hover mx-auto lg:ml-0">Privacy policy</a>
          <a className="link link-hover mx-auto lg:ml-0">Cookie policy</a>
        </div>
      </div>
      <div className="footer footer-center p-4 bg-slate-900 text-white">
        <p>
          Copyright © 2023 - All right reserved by House Hounter Industries Ltd
        </p>
      </div>
    </footer>
  );
};

export default Footer;
