import React from "react";
import { useNavigate } from "react-router-dom";

interface TeamMemberProps {
    name: string;
    role: string;
    description: string;
    imageUrl: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
    name,
    role,
    description,
    imageUrl,
}) => (
    <div className="mb-8">
        <img
            src={imageUrl}
            alt={name}
            className="w-32 h-32 rounded-full mb-4 mx-auto"
        />
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{role}</p>
        <p>{description}</p>
    </div>
);

const AboutPage: React.FC = () => {
    const teamMembers: TeamMemberProps[] = [
        {
            name: "John Doe",
            role: "Founder & CEO",
            description:
                "John is the visionary leader of our team, with a passion for technology and innovation.",
            imageUrl: 'https://source.unsplash.com/80x80?cat',
        },
        {
            name: "Jane Smith",
            role: "Lead Designer",
            description:
                "Jane's creative mind brings life to our projects, designing user-friendly and stunning interfaces.",
            imageUrl: 'https://source.unsplash.com/80x80?dog',

        },
        {
            name: "Michael Johnson",
            role: "Lead Developer",
            description:
                "Michael is a coding guru who turns ideas into reality, ensuring our products are robust and functional.",
            imageUrl: 'https://source.unsplash.com/80x80?bird',

        },
        {
            name: "Emily Williams",
            role: "Marketing Specialist",
            description:
                "Emily drives our brand's success through strategic marketing campaigns and engaging content.",
            imageUrl: 'https://source.unsplash.com/80x80?peguin',
        },
    ];

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/home");
    };

    return (
        <div className="w-[80%] m-auto mb-3 mt-5">
            <div className="overflow-hidden flex flex-col">
                <div className="flex flex-col">
                    <div className="flex p-2">
                        <img
                            src="https://file.rendit.io/n/BMguV6XTfgasPlBI7Wr2.svg"
                            className="w-10 h-10 m-2 "
                            alt="Logo"
                            onClick={handleLogoClick}
                        />
                        <p
                            className="p-3 pt-5 pr-6 text-xl text-center cursor-pointer"
                            onClick={handleLogoClick}
                        >
                            <strong>About</strong>Us
                        </p>

                    </div>
                </div>

                <div className="p-5">
                    <p className="mb-8">
                        We are a dedicated team of professionals who are passionate about
                        delivering innovative solutions to our clients. Meet our team members
                        who make it all happen
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <TeamMember
                                key={index}
                                name={member.name}
                                role={member.role}
                                description={member.description}
                                imageUrl={member.imageUrl}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AboutPage;
