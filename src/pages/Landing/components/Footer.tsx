import githubIcon from '@/assets/images/github-icon.svg'
import Container from '@/components/common/Container/Container'
import { MAX_CONTENT_WIDTH } from '@/styles/sizes/sizes'
import { TextBody } from '@/components/common/Text/TextFactory'
import styled from 'styled-components'
import { breakpoints } from '@/styles/breakpoints/breakpoints'

function Footer() {
  return (
    <Container size="full-width" justify="center">
      <FooterWrapper>
        <Container gap="12px" direction="row">
          <Container gap="5px" direction="row" justify="center" align="flex-end">
            <img src={githubIcon} alt="link icon" style={{ height: '20px' }} />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/kakao-tech-campus-2nd-step3/Team13_FE"
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
            >
              <TextBody.Medium style={{ fontWeight: '600' }}> Github FE</TextBody.Medium>
            </a>
          </Container>

          <Container gap="5px" direction="row" justify="center" align="flex-end">
            <img src={githubIcon} alt="link icon" style={{ height: '20px' }} />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/kakao-tech-campus-2nd-step3/Team13_BE"
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
            >
              <TextBody.Medium style={{ fontWeight: '600' }}> Github BE</TextBody.Medium>
            </a>
          </Container>
        </Container>
        <CopyrightWrapper>
          <div>©Copyright 2024. 카카오테크캠퍼스 13조.</div>
          <div>All Rights Reserved.</div>
        </CopyrightWrapper>
      </FooterWrapper>
    </Container>
  )
}

const FooterWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0 40px;
  max-width: ${MAX_CONTENT_WIDTH};
  gap: 14px;

  @media (min-width: ${breakpoints.sm}) {
    gap: 20px;
    height: 200px;
  }
`

const CopyrightWrapper = styled.div`
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media (min-width: ${breakpoints.xs}) {
    flex-direction: row;
  }
`

export default Footer
