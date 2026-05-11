async function handleLeadCapture(email: string, company: string, savings: number) {
  const { data, error } = await supabase
    .from('leads')
    .insert([{ 
        email: email, 
        company_name: company, 
        total_savings: savings 
    }])

  if (error) {
    console.error('Error saving lead:', error)
    return
  }
  
  alert("Report saved! Check your email soon.")
  // Note: This is where you would also trigger your Resend transactional email 
}