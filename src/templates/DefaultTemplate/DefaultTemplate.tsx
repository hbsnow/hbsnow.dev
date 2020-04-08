import React from 'react'
import globalStyles from '../../styles/globalStyles'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

type Props = {}

const DefaultTemplate: React.FC<Props> = ({ children }) => {
  return (
    <div className="root">
      <Header />
      <main>{children}</main>
      <Footer />
      <style jsx>{`
        .root {
          overflow: hidden;
        }
      `}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  )
}

export default DefaultTemplate
