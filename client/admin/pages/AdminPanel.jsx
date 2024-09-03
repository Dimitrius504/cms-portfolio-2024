import React from 'react'
import HeroContents from '../../src/components/Home/HeroContents'
import AdminCard from '../components/AdminCard'

const AdminPanel = () => {
    return (
        <div className=''>
            <HeroContents title='Admin Panel' subtitle='Welcome Admin' bg='bg-indigo-700' />
            <section>
                <AdminCard />
            </section>
        </div>
    )
}

export default AdminPanel