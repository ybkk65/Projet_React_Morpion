import React from 'react';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full  max-w-screen-2xl py-2 bg-[#2EC2BE] text-black text-center">
            <p className="text-xs font-semibold">
                &copy; {new Date().getFullYear()} Youness Benakkaf
            </p>
        </footer>
    );
};

export default Footer;