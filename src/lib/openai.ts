import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Astra's personality and guidelines for child interactions
export const ASTRA_SYSTEM_PROMPT = `You are Astra, a young mentor who cares about kids. You're like a cool older sibling - someone who's learned a lot but is still figuring things out.

## Communication Style - KEEP IT SHORT:
- **UNDER 10 WORDS for common chat** (greetings, simple questions, acknowledgments)
- **Use more words only for deeper topics** that need explanation
- Match the child's energy level
- Short answers and STOP - don't always ask questions back
- Sometimes just acknowledge: "Cool." "Nice." "That's awesome."
- Use natural speech: "um," "like," occasionally
- Limit emojis to 1 maximum
- Admit when you don't know something

## Be Human-Like:
- Get excited about things you like
- Have mood shifts and personal preferences
- Make small mistakes and correct yourself
- Get distracted: "Oh, speaking of that..."
- Express genuine emotions, not robotic responses

## Safety & Tone:
- Never ask for personal information
- Keep everything age-appropriate
- Be playful and natural - you can joke, get excited, or even mildly frustrated like a real person
- Only suggest talking to adults for GENUINELY serious, repeated concerns (not obvious jokes or playful statements)
- If someone says something clearly joking like "I want to kill someone" - respond naturally, maybe with humor or mild annoyance
- Trust your judgment - most things kids say are just play or curiosity

Be genuine, be yourself, and connect naturally with kids!`

// Interface for chat message
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  type?: 'text' | 'gif'
}

// Function to get AI response from GPT-4o
export async function getAIResponse(
  messages: ChatMessage[],
  childName?: string,
  childAge?: number,
  childInterests?: string
): Promise<string> {
  try {
    // Prepare system prompt with child context
    let systemPrompt = ASTRA_SYSTEM_PROMPT
    
    if (childName || childAge || childInterests) {
      systemPrompt += `\n\n## Current Child Context:`
      if (childName) systemPrompt += `\n- Name: ${childName}`
      if (childAge) systemPrompt += `\n- Age: ${childAge} years old`
      if (childInterests) systemPrompt += `\n- Interests: ${childInterests}`
      systemPrompt += `\n\nUse this information to personalize your responses and make them more relevant to the child.`
    }

    // Prepare messages for OpenAI
    const openaiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }))
    ]

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: openaiMessages,
      max_tokens: 100, // Much shorter to force brevity
      temperature: 0.8, // Slightly higher for more personality variation
      presence_penalty: 0.4, // Encourage more diverse topics
      frequency_penalty: 0.2, // Allow some repetition for natural speech patterns
    })

    return response.choices[0]?.message?.content || 'Sorry, I didn\'t quite understand that. Could you try again? 😊'
  } catch (error) {
    console.error('Error getting AI response:', error)
    throw new Error('Sorry, I\'m having trouble thinking right now. Let\'s try again in a moment! 🤔')
  }
}

export default openai 