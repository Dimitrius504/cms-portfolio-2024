import React from 'react';
import { NavLink } from "react-router-dom";

const FooterLinks = () => {
	return (
		<div class="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
			<ul class="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
				<li>
					<NavLink to="/" className="text-gray-400 hover:text-white">
						Home
					</NavLink>
				</li>
				<li className="mx-4">
					<NavLink to="/about" className="text-gray-400 hover:text-white">
						About
					</NavLink>
				</li>
				<li>
					<NavLink to="/skills" className="text-gray-400 hover:text-white">
						Skills
					</NavLink>
				</li>
				<li>
					<NavLink to="/account" className="text-gray-400 hover:text-white">
						Acccount
					</NavLink>
				</li>
				<li>
					<NavLink to="/contact" className="text-gray-400 hover:text-white">
						Contact
					</NavLink>
				</li>
				<li>
					<NavLink to="/blog" className="text-gray-400 hover:text-white">
						Blog
					</NavLink>
				</li>
				<li>
					<NavLink to="/resume" className="text-gray-400 hover:text-white">
						Resume
					</NavLink>
				</li>
				<li>
					<NavLink to="/projects" className="text-gray-400 hover:text-white">
						Projects
					</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default FooterLinks