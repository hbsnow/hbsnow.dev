import React from 'react'
import Container from '../../elements/container/Container'
import Sns from '../../components/footer/Sns'

const Footer = ({ ...restProps }: FooterProps): JSX.Element => {
  return (
    <footer className="footer" {...restProps}>
      <Container>
        <Sns />
      </Container>
      <style jsx>{`
        .footer {
          border-top: 1px solid var(--color-default-divider);
        }
      `}</style>
    </footer>
  )
}

type FooterProps = {} & JSX.IntrinsicElements['footer']

export default Footer
