import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    startDate: '01-02-2024',
    endDate: '01-03-2024',
    name: 'Sondage 2024',
    slug: 'sondage2024',
    additionalQuestions: ['email', 'postalcode', 'birthdate'],
    expectedNumberOfParticipants: 50,
    organisationInfo: {
      name: 'SNCF',
      slug: 'sncf',
    },
  })
}
