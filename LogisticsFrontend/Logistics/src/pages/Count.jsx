import { Briefcase, Globe, Truck, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Count = () => {
    const [clients, setClients] = useState(0);
    const [projects, setProjects] = useState(0);
    const [offices, setOffices] = useState(0);
    const [teams, setTeams] = useState(0);


    useEffect(() => {
        const duration = 2000;
        const steps = 60;

        const clientTarget = 500;
        const projectTarget = 1500;
        const officeTarget = 10;
        const teamTarget = 100;

        const clientStep = clientTarget / steps;
        const projectStep = projectTarget / steps;
        const officeStep = officeTarget / steps;
        const teamStep = teamTarget / steps;

        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;

            setClients(Math.floor(clientStep * currentStep));
            setProjects(Math.floor(projectStep * currentStep));
            setOffices(Math.floor(officeStep ** currentStep));
            setTeams(Math.floor(teamStep * currentStep))

            if (currentStep >= steps) {
                clearInterval(interval);
                setClients(clientTarget);
                setProjects(projectTarget);
                setOffices(officeTarget);
                setTeams(teamTarget);
            }

        }, duration / steps);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className='grid md:grid-cols-4 place-items-center bg-[#BDD9D7] py-10 text-[#093856] gap-5'>
            <div className='flex justify-around md:justify-center items-center gap-4 w-full' >
                <Truck size={50} />
                <div>
                    <h1>{clients} +</h1>
                    <p>Clients Served</p>
                </div>
            </div>
            <div className='flex justify-around md:justify-center items-center gap-4 w-full'>
                <Briefcase size={50} />
                <div>
                    <h1>{projects} +</h1>
                    <p>Projects Completed</p>

                </div>
            </div>
            <div className='flex justify-around md:justify-center items-center gap-4 w-full'>
                <Globe size={50} />
                <div>
                    <h1>{offices} +</h1>
                    <p>Global Offices</p>
                </div>
            </div>

            <div className='flex justify-around md:justify-center items-center gap-4 w-full'>
                <Users size={50}/>
                <div>
                    <h1>{teams} +</h1>
                    <p>Team Members</p>
                </div>
            </div>
        </div>
    )
}

export default Count