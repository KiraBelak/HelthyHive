import SocialIcon from "@/components/icons/Social";
//EDIT ME PLEASE
const copyrightLabel = `©${new Date().getFullYear()} Healthy Hive & Salud Digna. All rights reserved.`;
const socialLink = [
  {
    name: "Facebook",
    href: "#",
    icon: "facebook",
  },
  {
    name: "Instagram",
    href: "#",
    icon: "instagram",
  },
  {
    name: "TikTok",
    href: "#",
    icon: "tiktok",
  },
  {
    name: "Twitter",
    href: "#",
    icon: "twitter",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {socialLink.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-black hover:text-gray-500"
            >
              <div className="iconcontainer cursor-pointer w-6 h-6 text-black">
                <SocialIcon type={item.icon} />
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-black">
            {copyrightLabel}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
