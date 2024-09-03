// components/BlogListContainer.jsx
import React from 'react';
import HeroContents from '../Home/HeroContents';

const BlogListContainer = ({ children }) => {
    return (
        <>
            <HeroContents
                title="Blog"
                subtitle="Read my latest blog posts"
                bg="bg-indigo-700"
            />
            <div className="max-w-4xl mx-auto py-8">

                <div className="space-y-6">
                    {children}
                </div>
            </div>
        </>
    );
};

export default BlogListContainer;
