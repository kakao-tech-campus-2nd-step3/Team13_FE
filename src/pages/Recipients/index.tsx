import styled from 'styled-components'
import { RecipientsList } from './RecipientsList'
import image from '@/assets/images/sample.png'
import { Heading, TextBody } from '@/components/common/Text/TextFactory'
import { colors } from '@/styles/colors'
import searchIcon from '@/assets/icons/search_icon.svg'
import { useState } from 'react'
import Back from '@/components/common/Back'

const recipients = [
  {
    picture: image,
    name: '문정윤',
    birthday: '991016',
  },
  {
    picture: image,
    name: '이진솔',
    birthday: '010126',
  },
  {
    picture: image,
    name: '이지수',
    birthday: '020430',
  },
  {
    picture: image,
    name: '박혜연',
    birthday: '021028',
  },
  {
    picture: image,
    name: '김태윤',
    birthday: '010626',
  },
  {
    picture: image,
    name: '이영준',
    birthday: '970920',
  },
  {
    picture: image,
    name: '유경미',
    birthday: '021027',
  },
  {
    picture: image,
    name: '문정윤',
    birthday: '991016',
  },
  {
    picture: image,
    name: '이진솔',
    birthday: '010126',
  },
  {
    picture: image,
    name: '이지수',
    birthday: '020430',
  },
  {
    picture: image,
    name: '박혜연',
    birthday: '021028',
  },
  {
    picture: image,
    name: '김태윤',
    birthday: '010626',
  },
  {
    picture: image,
    name: '이영준',
    birthday: '970920',
  },
  {
    picture: image,
    name: '유경미',
    birthday: '021027',
  },
]

interface ListWrapperProps {
  isScrolled: boolean
}

export const Recipients = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const handleScroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    setIsScrolled(scrollTop > 0)
  }

  return (
    <Wrapper>
      <Heading.Medium style={{ width: '100%', margin: '20px 0' }}>피요양자 선택</Heading.Medium>
      <Search>
        <img src={searchIcon} alt="searchIcon" style={{ width: '22px' }} />
        <InputField placeholder="이름으로 검색" />
      </Search>
      <ListWrapper onScroll={handleScroll} isScrolled={isScrolled}>
        {recipients.map((recipient, index) => (
          <RecipientsList
            key={index}
            picture={recipient.picture}
            name={recipient.name}
            birthday={recipient.birthday}
          ></RecipientsList>
        ))}
      </ListWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 0 28px;
  box-sizing: border-box;
`

const Search = styled.div`
  border: 1px solid ${colors.border.subtle};
  width: 100%;
  height: 57px;
  background-color: rgba(217, 217, 217, 0.2);
  border-radius: 30px;
  box-sizing: border-box;
  padding: 0 27px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const InputField = styled.input`
  background-color: transparent;
  border: none;
  margin-left: 8px;
  font-size: 20px;
  outline: none;
  margin-top: 2px;

  &:focus::placeholder {
    color: transparent;
  }
`

const ListWrapper = styled.div<ListWrapperProps>`
  width: 100vw;
  height: calc(100vh - 200px);
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;

  padding: 0 28px;

  box-shadow: ${({ isScrolled }) =>
    isScrolled ? 'inset 0 10px 10px -10px rgba(0, 0, 0, 0.2)' : 'none'};
  transition: box-shadow 0.3s ease;
`
