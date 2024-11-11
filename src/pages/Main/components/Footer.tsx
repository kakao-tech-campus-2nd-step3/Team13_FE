import Logo from '@/assets/images/logo.svg'
import SmallLogo from '@/assets/images/small_logo.svg'
import githubIcon from '@/assets/images/github-icon.svg'
import Container from '@/components/common/Container/Container'
import { MAX_CONTENT_WIDTH } from '@/styles/sizes/sizes'
import { TextBody } from '@/components/common/Text/TextFactory'

function Footer() {
  return (
    <Container size="full-width" justify="center">
      <Container
        size={{ width: '100%', height: '200px' }}
        direction="column"
        justify="center"
        gap="26px"
        align="flex-start"
        padding="0 40px"
        maxWidth={MAX_CONTENT_WIDTH}
      >
        <Container gap="12px" direction="row">
          <Container gap="5px" direction="row" justify="center" align="flex-end">
            <img src={githubIcon} alt="link icon" style={{ height: '20px' }} />
            <a
              rel="stylesheet"
              href=""
              style={{
                textDecoration: 'none',
                color: 'black',
                fontWeight: '600',
              }}
            >
              Github FE
            </a>
          </Container>

          <Container gap="5px" direction="row" justify="center" align="flex-end">
            <img src={githubIcon} alt="link icon" style={{ height: '20px' }} />
            <a
              rel="stylesheet"
              href=""
              style={{
                textDecoration: 'none',
                color: 'black',
                fontWeight: '600',
              }}
            >
              Github BE
            </a>
          </Container>
        </Container>
        <div style={{ fontWeight: '600' }}>
          ©Copyright 2024. 카카오테크캠퍼스 13조. All Rights Reserved.
        </div>
      </Container>
    </Container>
  )
}

export default Footer
