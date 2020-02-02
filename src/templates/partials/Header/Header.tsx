import Link from 'next/link'
import { SerializedStyles, css } from '@emotion/core'
import styled from '@emotion/styled'
import Container from '../../../components/Container/Container'

const headerCss = css`
  color: var(--color-primary-text);
  background-color: var(--color-primary-bg);
`
const Grid = styled.div`
  display: flex;
  align-items: center;
`
const Spacer = styled.div`
  flex: 1 1 auto;
`
const TitleGroup = styled.div``
const Title = styled.h1`
  font-size: 1rem;
`

const Header = ({ css, title, ...props }: HeaderProps): JSX.Element => {
  return (
    <header css={[headerCss, css]} {...props}>
      <Container>
        <Grid>
          <TitleGroup>
            <Title>
              <Link href="/">
                <a>hbsnow.dev</a>
              </Link>
            </Title>
            {title && <h2>{title}</h2>}
          </TitleGroup>
          <Spacer></Spacer>
          <div>
            <Link href="/blog">
              <a>blog</a>
            </Link>
            <Link href="/books">
              <a>books</a>
            </Link>
            <Link href="/about">
              <a>about</a>
            </Link>
          </div>
        </Grid>
      </Container>
    </header>
  )
}

type HeaderProps = {
  css?: SerializedStyles
  title?: string
} & JSX.IntrinsicElements['header']

export default Header
