import React from 'react'
import globalStyles from '../../styles/globalStyles'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({
  children,
  ...restProps
}) => {
  return (
    <div {...restProps}>
      <Header />
      <main>{children}</main>
      <Footer />
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  )
}

type DefaultTemplateProps = {} & JSX.IntrinsicElements['div']

export default DefaultTemplate
