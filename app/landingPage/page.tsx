//app\landingPage\page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Award, CreditCard, Globe, ChevronDown, Menu, X, Star, CheckCircle, Facebook, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRightCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TutorLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);


  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
  
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const stats = [
    { number: '50,000+', label: 'Students' },
    { number: '5,000+', label: 'UX/UI Certified Instructors' },
    { number: 'Powered by', label: 'Secure Payment Gateway' },
    { number: 'Learning Worldwide', label: 'Across International Curriculum' }
  ];

  const tutors = [
    {
      name: 'Martin Trabbs',
      subject: 'English',
      rating: 5.0,
      reviews: 140,
      hourlyRate: 18,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      grades: ['ENGLISH', 'GRADE 7', 'GRADE 8', 'IB'],
      subjects: ['ALGEBRA', 'ALGEBRA 1', 'ALGEBRA 2']
    },
    {
      name: 'Wang Lin',
      subject: 'Chinese',
      rating: 4.9,
      reviews: 98,
      hourlyRate: 20,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      grades: ['CHINESE', 'HSK 1-4', 'GRADE 8', 'IB'],
      subjects: ['GRADE 1', 'CALCULUS', 'CHINESE']
    },
    {
      name: 'Jackson Langstaff',
      subject: 'Math',
      rating: 5.0,
      reviews: 112,
      hourlyRate: 22,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      grades: ['ENGLISH', 'GRADE 7', 'MATH 7', 'IB'],
      subjects: ['GRADE 1', 'MATH 1', 'CALCULUS']
    },
    {
      name: 'Myriam Raymonds',
      subject: 'Science',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 19,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      grades: ['ENGLISH', 'GRADE 7', 'IB', 'AP'],
      subjects: ['SCIENCE', 'PHYSICS', 'CHEMISTRY']
    }
  ];

  const faqs = [
    {
      question: 'Should I Consider A Full Time Online Tutoring Course?',
      answer: 'Online tutoring courses offer flexibility and personalized learning at your own pace. They are ideal for balancing education with work or other commitments, providing access to quality instructors worldwide.'
    },
    {
      question: 'Why Should I Switch To Online Tutoring?',
      answer: 'Online tutoring provides convenience, flexibility, and access to expert tutors globally. You can learn from the comfort of your home, schedule sessions at your convenience, and choose from a diverse pool of qualified instructors.'
    },
    {
      question: 'I Have Never Created Learning Material Before - How Do I Begin?',
      answer: 'Start by identifying your learning goals and the subjects you need help with. Browse our platform to find tutors that match your needs, schedule a trial session, and begin your learning journey with guidance from experienced educators.'
    },
    {
      question: 'How Much Time And Energy Do I Need To Spend In Order To Make My Income 2x?',
      answer: 'The time investment varies based on your goals and current skill level. Most students see significant improvement with consistent 2-4 hour weekly sessions combined with practice. Your tutor will create a personalized plan to help you achieve your goals efficiently.'
    }
  ];

  const articles = [
    {
      title: 'How Teachers Can Earn An Extra Income Through Online During Tutoring',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
      author: 'TheTutor.Me',
      date: 'MARCH 15, 2024',
      tags: ['ONLINE LEARNING', 'TEACHERS']
    },
    {
      title: '6 Effective Ways To Help Graduates The Fear of Speaking English',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=400&fit=crop',
      author: 'TheTutor.Me',
      date: 'MARCH 12, 2024',
      tags: ['ENGLISH', 'STUDENTS']
    },
    {
      title: 'How Teachers Can Build An Active Second Income Through Online Tutoring',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      author: 'TheTutor.Me',
      date: 'MARCH 08, 2024',
      tags: ['INCOME', 'ONLINE TUTORING']
    },
    {
      title: '6 Ways To Build Elementary Social Studies Learning More Effective',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
      author: 'TheTutor.Me',
      date: 'MARCH 05, 2024',
      tags: ['EDUCATION', 'TEACHING']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
            ? 'bg-white/60 backdrop-blur-md shadow border-b border-gray-200'
            : 'bg-transparent'
        }`}
        >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TheTutor<span className="text-emerald-500">.Me</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-emerald-500 font-medium">Home</button>
              <button onClick={() => scrollToSection('courses')} className="text-gray-600 hover:text-emerald-500">Courses</button>
              <button onClick={() => scrollToSection('tutors')} className="text-gray-600 hover:text-emerald-500">Tutor</button>
              <button onClick={() => scrollToSection('news')} className="text-gray-600 hover:text-emerald-500">News</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-emerald-500">Contact us</button>
            </div>

            <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
                <span className="bg-emerald-500 text-white px-6 py-2 cursor-pointer rounded-full hover:bg-emerald-600 transition-colors font-medium flex items-center gap-2">
                Sign In
                <ArrowRightCircle className="w-4 h-5" />
                </span>
            </Link>
            </div>


            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-emerald-500 font-medium py-2">HOME</button>
              <button onClick={() => scrollToSection('courses')} className="block w-full text-left text-gray-600 py-2">COURSES</button>
              <button onClick={() => scrollToSection('tutors')} className="block w-full text-left text-gray-600 py-2">TUTORS</button>
              <button onClick={() => scrollToSection('news')} className="block w-full text-left text-gray-600 py-2">NEWS</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-gray-600 py-2">CONTACT US</button>
              <button className="block w-full text-left text-gray-600 py-2">LOGIN</button>
              <button className="w-full bg-emerald-500 text-white px-6 py-2 rounded-full">SIGN UP</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-6">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-emerald-700 font-medium">All-in-One Learning Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Access The Best Online Tutors,<br />
              Bespoke Learning Material &<br />
              Performance Analytics On One<br />
              <span className="text-emerald-500">Platform!</span>
            </h1>
          </div>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <select className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>Select Location</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>Select Subject</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>Subject Category</option>
              </select>
              <input
                type="text"
                placeholder="Enter hourly budget"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-gray-600">Popular Searches:</span>
              {['CAMBRIDGE', 'EDEXCEL', 'ENGLISH', 'MATH', 'CHINESE', 'INTERNATIONAL'].map((tag) => (
                <span key={tag} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <button className="w-full bg-emerald-500 text-white py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              TheTutor.Me<br />In Numbers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-100">
                {index === 2 ? (
                  <CreditCard className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
                ) : index === 3 ? (
                  <Globe className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
                ) : (
                  <div className="text-4xl font-bold text-emerald-500 mb-2">{stat.number}</div>
                )}
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutors Section */}
      <section id="tutors" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Leading Online Tutors</h2>
              <div className="flex gap-4 mt-4">
                <button className="bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-medium">Chemistry</button>
                <button className="bg-white text-gray-700 px-6 py-2 rounded-full text-sm font-medium border border-gray-300">Chinese</button>
                <button className="bg-white text-gray-700 px-6 py-2 rounded-full text-sm font-medium border border-gray-300">Accounts</button>
                <button className="bg-white text-gray-700 px-6 py-2 rounded-full text-sm font-medium border border-gray-300">English</button>
              </div>
            </div>
            <button className="text-emerald-500 font-medium hover:underline">EXPLORE ALL →</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutors.map((tutor, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={tutor.image} alt={tutor.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{tutor.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{tutor.name}</h3>
                  <p className="text-emerald-500 font-medium mb-2">{tutor.subject}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Star className="w-4 h-4 fill-gray-400 text-gray-400" />
                    <span>{tutor.rating} ({tutor.reviews} Reviews)</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {tutor.subject === 'English' ? 'Hi, I\'m Lola! Passionate in helping students unlock potential in English.' : 
                     tutor.subject === 'Chinese' ? 'Experienced Chinese tutor specialized in HSK preparation and conversational skills.' :
                     tutor.subject === 'Math' ? 'Mathematics expert with proven track record in helping students excel.' :
                     'Dedicated science educator making complex concepts simple and engaging.'}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutor.grades.map((grade, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {grade}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutor.subjects.map((subject, i) => (
                      <span key={i} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">${tutor.hourlyRate}</span>
                    <button className="bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Learning Section */}
      <section id="courses" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Learn With TheTutor.Me's AI<br />Learning Agent!
              </h2>
              <p className="text-gray-600 mb-8">
                Experience personalized learning powered by advanced AI technology. Our intelligent learning agent adapts to your pace, identifies your strengths and weaknesses, and creates customized study plans to maximize your success.
              </p>
              <button className="bg-emerald-500 text-white px-8 py-3 rounded-full hover:bg-emerald-600 transition-colors font-medium">
                Try it now!
              </button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl p-12 text-white">
                <Award className="w-24 h-24 mb-4" />
                <h3 className="text-2xl font-bold mb-4">AI-Powered Learning</h3>
                <p className="text-emerald-100">
                  Personalized recommendations, instant feedback, and adaptive learning paths designed just for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              In The News About Tutoring
            </h2>
            <button className="text-emerald-500 font-medium hover:underline">EXPLORE ALL →</button>
          </div>

          <div className="mb-8">
            <p className="text-gray-600">
              Get The Other News, We Excellence With Rhythmus Integration and Online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked<br />Questions
              </h2>
              <p className="text-gray-600 mb-8">
                Get The Other News, We Excellence With Rhythmus Integration and Online
              </p>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="Students learning" 
                className="rounded-2xl w-full"
              />
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    className="w-full flex justify-between items-center p-6 bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  >
                    <span className="font-semibold text-left">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="p-6 bg-white">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-500 to-emerald-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join us and make a change in the cloud!
          </h2>
          <h3 className="text-xl md:text-2xl text-emerald-100 mb-8">
            Are You An Online Tutor?<br />
            Sign-Up And Make A Change
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold">
              Become an Online Tutor
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-emerald-600 transition-colors font-semibold">
              Sign up as a Student
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">TheTutor<span className="text-emerald-500">.Me</span></span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering learners worldwide with quality online education.
              </p>
              <div className="flex gap-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-emerald-500 cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-emerald-500 cursor-pointer" />
                <Youtube className="w-5 h-5 text-gray-400 hover:text-emerald-500 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">What We Are</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-emerald-500 cursor-pointer">About Us</li>
                <li className="hover:text-emerald-500 cursor-pointer">Our Tutors</li>
                <li className="hover:text-emerald-500 cursor-pointer">How We Work</li>
                <li className="hover:text-emerald-500 cursor-pointer">Testimonials</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Learn</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-emerald-500 cursor-pointer">Find a Tutor</li>
                <li className="hover:text-emerald-500 cursor-pointer">Subjects</li>
                <li className="hover:text-emerald-500 cursor-pointer">Blog</li>
                <li className="hover:text-emerald-500 cursor-pointer">FAQ</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-emerald-500 cursor-pointer flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  help@thetutor.me
                </li>
                <li className="hover:text-emerald-500 cursor-pointer flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +1 234 567 8900
                </li>
                <li className="hover:text-emerald-500 cursor-pointer flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Privacy Policy
                </li>
                <li className="hover:text-emerald-500 cursor-pointer">Terms & Conditions</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>Copyright © 2025 TheTutor.Me. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}