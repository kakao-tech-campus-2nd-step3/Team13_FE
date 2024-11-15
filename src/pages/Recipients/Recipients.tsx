import styled from 'styled-components'
import { RecipientsList } from './RecipientsList'
import image from '@/assets/images/profile.svg'
import { Heading } from '@/components/common/Text/TextFactory'
import { useEffect, useState } from 'react'
import { Recipient } from '@/api/hooks/admin/recipient/types'
import { getRecipients } from '@/api/hooks/user/recipient/recipientApi'

interface ListWrapperProps {
  isScrolled: boolean
}

export const RecipientsPage = () => {
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const role = localStorage.getItem('role')
  localStorage.setItem('chartType', 'DIY')

  useEffect(() => {
    localStorage.removeItem('chartData')
    const fetchRecipients = async () => {
      try {
        const data = await getRecipients(role!)
        setRecipients(data)
      } catch (error) {
        console.error('Failed to fetch recipients:', error)
      }
    }
    fetchRecipients()
  }, [role])

  const scroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    setIsScrolled(scrollTop > 0)
  }

  return (
    <Wrapper>
      <Heading.Medium style={{ width: '100%', margin: '20px 0 10px 0' }}>
        돌봄대상자를 선택해주세요.
      </Heading.Medium>
      <ListWrapper onScroll={scroll} isScrolled={isScrolled}>
        {recipients.map((recipient) => (
          <RecipientsList
            key={recipient.id}
            recipientId={recipient.id}
            picture={image}
            name={recipient.name}
            birthday={recipient.birth}
          />
        ))}
      </ListWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 0 28px;
  box-sizing: border-box;
`

const ListWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isScrolled'].includes(prop),
})<ListWrapperProps>`
  width: 100%;
  height: calc(100vh - 200px);
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  flex-grow: 1;

  box-shadow: ${({ isScrolled }) =>
    isScrolled ? 'inset 0 10px 10px -10px rgba(0, 0, 0, 0.2)' : 'none'};
  transition: box-shadow 0.3s ease;
`
