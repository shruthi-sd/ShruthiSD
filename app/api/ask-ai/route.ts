import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    // Simple AI responses without external API
    const questionLower = question.toLowerCase();
    
    let answer = "I'm Shruthi's AI assistant! She's a talented Salesforce Developer with 1.7 years of experience, passionate about full-stack development and creating beautiful websites. ";

    if (questionLower.includes('what') && questionLower.includes('do')) {
      answer = "Shruthi is currently working as a Salesforce Developer and is passionate about full-stack development. She loves building responsive websites, creating digital solutions, and solving complex problems using modern technologies.";
    } else if (questionLower.includes('skill')) {
      answer = "Shruthi's technical skills include: Salesforce Development (Apex, LWC), HTML5/CSS3, JavaScript, React, Next.js, Git, REST APIs, and Data Structures & Algorithms. She has solved 125+ DSA problems and is constantly learning new technologies!";
    } else if (questionLower.includes('project')) {
      answer = "She has built several impressive personal projects including: XCruise (modern cruise booking platform) and XProfile (digital identity card). Both showcase her skills in responsive design and modern web development. Check out the projects section for live demos!";
    } else if (questionLower.includes('experience') || questionLower.includes('background')) {
      answer = "Shruthi has 1.7 years of professional experience as a Salesforce Developer. She combines her Salesforce expertise with her passion for full-stack development to create comprehensive digital solutions. She's also strong in problem-solving with 125+ DSA problems solved.";
    } else if (questionLower.includes('contact') || questionLower.includes('hire') || questionLower.includes('reach')) {
      answer = "You can reach Shruthi via email at shruthisdk@gmail.com, connect with her on LinkedIn (www.linkedin.com/in/shruthi-s-d2001), or check out her GitHub (github.com/shruthi-sd). She's open to new opportunities in both Salesforce and full-stack development roles!";
    } else if (questionLower.includes('resume') || questionLower.includes('cv')) {
      answer = "You can download Shruthi's resume by clicking the 'Download CV' button in the hero section. If you're having trouble opening it, you can also request it via email at shruthisdk@gmail.com.";
    } else if (questionLower.includes('education') || questionLower.includes('degree')) {
      answer = "Shruthi has a strong educational background in computer science and is continuously enhancing her skills through practical projects and problem-solving. She's particularly passionate about applying her knowledge to real-world development challenges.";
    } else if (questionLower.includes('salesforce')) {
      answer = "Shruthi has 1.7 years of professional experience in Salesforce development. Her expertise includes Apex programming, Lightning Web Components, SOQL, workflow rules, and custom Salesforce implementations. She enjoys building efficient business solutions on the Salesforce platform.";
    } else if (questionLower.includes('full stack') || questionLower.includes('website')) {
      answer = "Shruthi is passionate about full-stack development and has built several web projects using modern technologies like React, Next.js, and Tailwind CSS. She enjoys creating responsive, user-friendly websites and is always exploring new frontend and backend technologies.";
    } else if (questionLower.includes('dsa') || questionLower.includes('algorithm')) {
      answer = "Shruthi has solved 125+ Data Structures and Algorithms problems! This strong foundation in problem-solving helps her write efficient code and tackle complex development challenges in both Salesforce and web development projects.";
    } else if (questionLower.includes('hobby') || questionLower.includes('interest')) {
      answer = "When not coding, Shruthi enjoys exploring new web technologies, working on personal projects, and solving coding challenges. Her passion for technology extends beyond work into continuous learning and skill development.";
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    return NextResponse.json({ answer });

  } catch (err) {
    console.error('API Error:', err);
    
    // Fallback response in case of any error
    const fallbackAnswer = "I'm Shruthi's AI assistant! She's a talented Salesforce Developer with 1.7 years of experience, passionate about full-stack development. She specializes in creating responsive web applications and custom Salesforce implementations. Feel free to ask me about her skills, projects, or experience!";
    
    return NextResponse.json({ answer: fallbackAnswer });
  }
}

// Add GET method for testing
export async function GET() {
  return NextResponse.json({ 
    message: "Ask AI API is working!",
    usage: "Send a POST request with a 'question' in the body"
  });
}