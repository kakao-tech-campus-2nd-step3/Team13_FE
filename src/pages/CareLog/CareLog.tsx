/** @jsxImportSource @emotion/react */
import Button from '@/components/common/Button/Button'
import * as S from '../../styles/pages/CareLog.styles'
import '../../styles/pages/CareLog.styles'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export const CareLogPage = () => {
  const navigate = useNavigate()
  return (
    <S.Container>
      <S.Header>
        <S.Birth>2002.04.30.</S.Birth>
        <S.Name>
          <span>김쿠키</span> 피요양자
        </S.Name>
        <S.SubTitle>OOO 요양원 | 2024.09.19. 업데이트</S.SubTitle>
      </S.Header>

      <S.TagContainer>
        <S.Tag>식사량 감소</S.Tag>
        <S.Tag>인지능력 저하</S.Tag>
        <S.Tag>우울감 상승</S.Tag>
      </S.TagContainer>

      <S.Content>
        <S.Date>
          <S.LogoContainer>
            <IoCalendarNumberOutline />
          </S.LogoContainer>{' '}
          2024.09.20.
        </S.Date>
        <S.Activity>
          <b>신체 활동 지원</b> 음악 치료와 퍼즐 놀이가 도움이 되었음.
        </S.Activity>
        <S.Activity>
          <b>인지관리 및 의사소통</b> 음악 치료와 퍼즐 놀이가 도움이 되었음.
        </S.Activity>
        <S.Activity>
          <b>식사 관리</b> 음악 치료와 퍼즐 놀이가 도움이 되었음.
        </S.Activity>
        <S.Activity>
          <b>화장실 이용</b> 음악 치료와 퍼즐 놀이가 도움이 되었음.
        </S.Activity>
      </S.Content>

      <Button
        theme="dark"
        margin="26px 0"
        width="100%"
        height="62px"
        onClick={() => navigate('/careLog/choice/body')}
      >
        상세 일지 보기
      </Button>
    </S.Container>
  )
}
