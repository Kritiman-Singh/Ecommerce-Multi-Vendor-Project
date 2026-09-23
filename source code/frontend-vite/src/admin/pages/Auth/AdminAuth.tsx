import React from 'react'
import AdminLoginForm from './AdminLogin'

const AdminAuth = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-ink px-4'>
        <div className='w-full max-w-md border border-line rounded-[24px] bg-coal px-8 py-12 shadow-card overflow-hidden'>
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl luxury-gradient-text">Zentro</h1>
              <p className="mt-1 text-[10px] tracking-[0.35em] uppercase text-muted">Admin Atelier</p>
            </div>
            <AdminLoginForm/>
        </div>
    </div>
  )
}

export default AdminAuth
