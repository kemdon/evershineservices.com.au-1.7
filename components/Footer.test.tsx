import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

describe('Footer Component', () => {
    it('renders company name', () => {
        render(<Footer />)
        expect(screen.getByText('Evershine Services')).toBeInTheDocument()
    })

    it('renders contact phone number', () => {
        render(<Footer />)
        expect(screen.getByText('1300 525 598')).toBeInTheDocument()
    })

    it('renders service links', () => {
        render(<Footer />)
        expect(screen.getByText('Cleaning Services')).toBeInTheDocument()
        expect(screen.getByText('Handyman Services')).toBeInTheDocument()
        expect(screen.getByText('Gardening Services')).toBeInTheDocument()
    })

    it('renders copyright notice', () => {
        render(<Footer />)
        const currentYear = new Date().getFullYear()
        expect(screen.getByText(`© ${currentYear} Evershine Services. All rights reserved.`)).toBeInTheDocument()
    })
})
