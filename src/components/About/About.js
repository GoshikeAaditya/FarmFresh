import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const Section = styled.div`
  margin: 40px 0;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const TeamMember = styled.div`
  text-align: center;
`;

const MemberImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 15px;
  object-fit: cover;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  text-align: center;
  margin: 40px 0;
`;

function About() {
  const team = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://example.com/team1.jpg',
      bio: 'Agricultural expert with 15 years of experience'
    },
    {
      id: 2,
      name: 'Rahul Verma',
      role: 'Head of Operations',
      image: 'https://example.com/team2.jpg',
      bio: 'Supply chain specialist'
    },
    {
      id: 3,
      name: 'Anjali Patel',
      role: 'Farmer Relations',
      image: 'https://example.com/team3.jpg',
      bio: 'Former organic farmer'
    }
  ];

  return (
    <AboutContainer>
      <Hero>
        <h1>About FarmFresh</h1>
        <p>Connecting farmers with consumers for a sustainable future</p>
      </Hero>

      <Section>
        <h2>Our Mission</h2>
        <p>At FarmFresh, we're committed to revolutionizing the way people access fresh, local produce while supporting sustainable farming practices and reducing food waste.</p>
      </Section>

      <Stats>
        <div>
          <h3>100+</h3>
          <p>Partner Farmers</p>
        </div>
        <div>
          <h3>50,000+</h3>
          <p>Happy Customers</p>
        </div>
        <div>
          <h3>30 Tons</h3>
          <p>Food Waste Saved</p>
        </div>
      </Stats>

      <Section>
        <h2>Our Team</h2>
        <TeamGrid>
          {team.map(member => (
            <TeamMember key={member.id}>
              <MemberImage src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.bio}</p>
            </TeamMember>
          ))}
        </TeamGrid>
      </Section>

      <Section>
        <h2>Our Values</h2>
        <ul>
          <li>Sustainability in every step</li>
          <li>Fair prices for farmers</li>
          <li>Quality produce for consumers</li>
          <li>Reducing food waste</li>
          <li>Supporting local communities</li>
        </ul>
      </Section>
    </AboutContainer>
  );
}

export default About;