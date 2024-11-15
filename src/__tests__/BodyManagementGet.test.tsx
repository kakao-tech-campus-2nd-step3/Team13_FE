import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BodyChoicePage } from '@/pages/Choice/Body/BodyChoice'

// Mock react-router-dom
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

// Utility function to wrap components with QueryClientProvider
const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient()
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

// Set up mock localStorage before each test
beforeEach(() => {
  localStorage.setItem(
    'chartData',
    JSON.stringify({
      bodyManagement: {
        wash: true,
        bath: false,
        mealType: '일반식',
        intakeAmount: '1 (전부)',
        physicalRestroom: '2',
        hasWalked: true,
        positionChangeRequired: false,
        mobilityAssistance: false,
        physicalNote: 'Test note',
      },
    }),
  )
  localStorage.setItem('chartType', 'DIY')
})

afterEach(() => {
  localStorage.clear()
})

describe('BodyChoicePage', () => {
  test('renders BodyChoicePage with pre-filled data from localStorage', async () => {
    renderWithProviders(<BodyChoicePage />)

    await waitFor(() => {
      expect(screen.getByText('청결 관리')).toBeInTheDocument()
      expect(screen.getByText('목욕')).toBeInTheDocument()
      expect(screen.getByText('화장실 이용 횟수')).toBeInTheDocument()
      expect(screen.getByText('산책 / 외출 동행')).toBeInTheDocument()
      expect(screen.getByDisplayValue('2')).toBeInTheDocument()
      expect(screen.getByText('1 (전부)')).toBeInTheDocument()
    })
  })

  test('displays error messages when required fields are empty', async () => {
    renderWithProviders(<BodyChoicePage />)

    fireEvent.click(screen.getByRole('button', { name: '확인' }))

    await waitFor(() => {
      expect(screen.getByText('식사 종류를 선택해주세요')).toBeInTheDocument()
      expect(screen.getByText('섭취량을 선택해주세요')).toBeInTheDocument()
      expect(screen.getByText('화장실 이용 횟수를 입력해주세요')).toBeInTheDocument()
    })
  })

  test('updates localStorage when options are changed', async () => {
    renderWithProviders(<BodyChoicePage />)

    const checkbox = screen.getByLabelText('목욕')
    fireEvent.click(checkbox)

    await waitFor(() => {
      const updatedData = JSON.parse(localStorage.getItem('chartData') || '{}')
      expect(updatedData.bodyManagement.bath).toBe(true)
    })
  })

  test('navigates to appropriate page on confirm based on chartType', async () => {
    renderWithProviders(<BodyChoicePage />)

    fireEvent.click(screen.getByRole('button', { name: '확인' }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/chart/significant/body')
    })
  })
})
