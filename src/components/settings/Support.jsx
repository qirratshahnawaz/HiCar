import { useState } from 'react';
import { FiArrowLeft, FiPlus, FiMinus, FiDownload } from 'react-icons/fi';
import TicketModal from './Ticketmodal';

const Support = () => {
  const [openFaq, setOpenFaq] = useState('how-to-list');
  const [showTickets, setShowTickets] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [tickets, setTickets] = useState([
    {
      id: 'KSD2023-001',
      subject: 'Payment Issue',
      email: 'alexanderjames@gmail.com',
      description: 'I was charged twice for my recent booking. Please help.',
      submittedOn: 'March 25, 2023',
      attachment: 'payment_receipt.pdf'
    },
    {
      id: 'KSD2023-002',
      subject: 'Login Issue',
      email: 'alexanderjames@gmail.com',
      description: 'I was logged out of my account and cannot log back in.',
      submittedOn: 'March 26, 2023',
      attachment: 'account_receipt.png'
    },
    {
      id: 'KSD2023-003',
      subject: 'Payment Issue',
      email: 'alexanderjames@gmail.com',
      description: 'I was charged twice for my recent booking. Please help.',
      submittedOn: 'March 28, 2023',
      attachment: 'payment_receipt.jpg'
    }
  ]);

  const faqs = [
    {
      id: 'how-to-list',
      question: 'How do I list my car for rent?',
      answer: 'Simply sign up, switch to Owner Mode, and add your car\'s details, including photos, rental price, and availability.'
    },
    {
      id: 'payments',
      question: 'How do I receive payments?',
      answer: 'Payments are automatically processed and transferred to your linked bank account after each completed rental.'
    },
    {
      id: 'driver-mode',
      question: 'How do I switch to Driver Mode?',
      answer: 'Go to your profile settings and toggle between Owner and Driver mode using the switch at the top of the page.'
    },
    {
      id: 'damage',
      question: 'What happens if my car is damaged?',
      answer: 'Our insurance policy covers damages during rentals. Report any incidents immediately through the app.'
    },
    {
      id: 'accident',
      question: 'What should I do in case of an accident?',
      answer: 'First ensure everyone\'s safety, then document the incident and contact our 24/7 support immediately.'
    }
  ];

  const handleSubmitTicket = (ticketData) => {
    const newTicket = {
      id: `KSD2023-${tickets.length + 1}`,
      ...ticketData,
      submittedOn: new Date().toLocaleDateString()
    };
    setTickets([...tickets, newTicket]);
    setShowTicketModal(false);
  };

  const isImage = (filename) =>
    /\.(jpg|jpeg|png|gif)$/i.test(filename);

  const getAttachmentUrl = (filename) =>
    `/uploads/${filename}`; 

  return (
    <div className="space-y-6">
      {!showTickets ? (
        <>
          <div className="flex items-center space-x-2">
            <FiArrowLeft className="text-gray-600" />
            <h2 className="text-xl font-semibold">Support</h2>
          </div>

          <div className="space-y-4 shadow-lg">
            <h3 className="text-lg font-medium">Frequently Asked Questions (FAQs)</h3>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {openFaq === faq.id ? (
                      <FiMinus className="text-gray-500" />
                    ) : (
                      <FiPlus className="text-gray-500" />
                    )}
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Need More Help?</h3>
                  <p className="text-sm text-gray-600">Generate a support ticket for further assistance.</p>
                </div>
                <button 
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                  onClick={() => setShowTickets(true)}
                >
                  Open Tickets
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={() => setShowTickets(false)}>
                <FiArrowLeft className="text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold">Submitted Tickets</h2>
            </div>
            <button 
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowTicketModal(true)}
            >
              Add Ticket
            </button>
          </div>

          {tickets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted on</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attachment</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{ticket.subject}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{ticket.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{ticket.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{ticket.submittedOn}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {isImage(ticket.attachment) ? (
                          <a 
                            href={getAttachmentUrl(ticket.attachment)} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-orange-500 hover:underline"
                          >
                            <img 
                              src={getAttachmentUrl(ticket.attachment)} 
                              alt="attachment" 
                              className="h-10 w-10 object-cover rounded"
                            />
                          </a>
                        ) : (
                          <a 
                            href={getAttachmentUrl(ticket.attachment)} 
                            download 
                            className="flex items-center text-orange-500 hover:text-orange-600"
                          >
                            <FiDownload className="mr-1" />
                            {ticket.attachment}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No tickets found! Click the "Add Ticket" button to add.</p>
            </div>
          )}
        </div>
      )}

      {showTicketModal && (
        <TicketModal 
          onClose={() => setShowTicketModal(false)}
          onSubmit={handleSubmitTicket}
        />
      )}
    </div>
  );
};

export default Support;
