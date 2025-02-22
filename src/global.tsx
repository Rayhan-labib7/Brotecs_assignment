

export const comboxes: Record<string, number> = {
  leadStatus: 1,
  leadContact: 30005,
  leadScore: 30006,
  industry: 2,
  leadCompany: 30008,
  powerOfContact: 4,
  country: 0,
};
export const Opportunitycomboxes: Record<string, number> = {
  opportunityStatus: 1,
  opportunityScore: 7,
  industry: 2,
  powerOfContact: 3,
  creaditQualification: 6,
};

export type ComboBoxOptions = {
  [key: string]: { id: string | number; value: string; email?: string }[]; // Array of options for each ComboBox
};
export type Stage = 'Open' | 'Qualified' | 'Unqualified' | 'Closed' | 'Contacted';


export interface AccessControl {
  read: boolean;
  write: boolean;
  delete: boolean;
}

export interface TableData {
  id: number;
  firstName: string;
  profilePicture:string;
  lastName: string;
  title: string;
  companyName: string;
  phone: string;
  email: string;
  owner: string;
  companyPhone: string;
  leadStatusKey: number;
  address: string;
  industry: string;
  createdAt: string;
  lastContacted: string;
  notes: string;
}

export const tableData: TableData[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    profilePicture:'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid',
    title: "Software Engineer",
    companyName: "Tech Corp",
    phone: "+1 123 456 7890",
    companyPhone: "+1 234 567 890",
    email: "johndoe@example.com",
    leadStatusKey: 1, // Contacted
    owner: "Alice Smith",
    address: "123 Main St, New York, NY 10001",
    industry: "Technology",
    createdAt: "2024-02-01",
    lastContacted: "2024-02-15",
    notes: "Follow-up scheduled next week.",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    profilePicture:"https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?semt=ais_hybrid",
    title: "Marketing Manager",
    companyName: "Biz Solutions",
    phone: "+1 987 654 321",
    companyPhone: "+1 987 654 321",
    email: "janesmith@example.com",
    leadStatusKey: 2, // Qualified
    owner: "Bob Johnson",
    address: "456 Oak St, Los Angeles, CA 90012",
    industry: "Marketing",
    createdAt: "2024-01-20",
    lastContacted: "2024-02-10",
    notes: "Interested in premium package.",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Lee",
    profilePicture:'https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?semt=ais_hybrid',
    title: "Product Manager",
    companyName: "StartupX",
    phone: "+1 555 999 888",
    companyPhone: "+1 555 999 888",
    email: "michaellee@example.com",
    leadStatusKey: 0, // Open
    owner: "Emma Wilson",
    address: "789 Pine St, San Francisco, CA 94103",
    industry: "SaaS",
    createdAt: "2024-01-10",
    lastContacted: "2024-02-05",
    notes: "Demo scheduled for next month.",
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Brown",
    profilePicture:'https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?semt=ais_hybrid',
    title: "HR Manager",
    companyName: "PeopleFirst HR",
    phone: "+1 333 777 555",
    companyPhone: "+1 333 777 555",
    email: "davidbrown@example.com",
    leadStatusKey: 3, // Unqualified
    owner: "Sophia Martinez",
    address: "890 Willow St, Chicago, IL 60601",
    industry: "Human Resources",
    createdAt: "2024-01-05",
    lastContacted: "2024-01-20",
    notes: "Not looking for new services at the moment.",
  },
  {
    id: 5,
    firstName: "Emily",
    lastName: "Davis",
    profilePicture:'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-175961.jpg?ga=GA1.1.844967250.1740206090&semt=ais_hybrid',
    title: "CEO",
    companyName: "FutureVision AI",
    phone: "+1 888 222 111",
    companyPhone: "+1 888 222 111",
    email: "emilydavis@example.com",
    leadStatusKey: 4, // Closed
    owner: "Daniel Thompson",
    address: "321 Maple St, Seattle, WA 98101",
    industry: "Artificial Intelligence",
    createdAt: "2023-12-15",
    lastContacted: "2024-01-30",
    notes: "Signed a deal, project in progress.",
  },
  {
    id: 6,
    firstName: "Chris",
    lastName: "Wilson",
    profilePicture:'https://img.freepik.com/free-photo/handsome-man-isolated-white-background_1368-4264.jpg?ga=GA1.1.844967250.1740206090&semt=ais_hybrid',
    title: "CFO",
    companyName: "FinTech Innovators",
    phone: "+1 777 444 333",
    companyPhone: "+1 777 444 333",
    email: "chriswilson@example.com",
    leadStatusKey: 2, // Qualified
    owner: "Jessica Clark",
    address: "654 Cedar St, Boston, MA 02108",
    industry: "Finance",
    createdAt: "2024-02-05",
    lastContacted: "2024-02-18",
    notes: "Exploring investment opportunities.",
  },
  {
    id: 7,
    firstName: "Olivia",
    lastName: "Taylor",
    profilePicture:'https://img.freepik.com/free-photo/close-up-shot-happy-delighted-charming-young-bearded-man-with-moustache-glasses-black-trendy-beanie-smiling-joyfully-laughing-feeling-satisfied-lucky_176420-23530.jpg?ga=GA1.1.844967250.1740206090&semt=ais_hybrid',
    title: "Sales Director",
    companyName: "Retail Hub",
    phone: "+1 666 555 444",
    companyPhone: "+1 666 555 444",
    email: "oliviataylor@example.com",
    leadStatusKey: 1, // Contacted
    owner: "James Roberts",
    address: "432 Birch St, Miami, FL 33101",
    industry: "Retail",
    createdAt: "2024-01-28",
    lastContacted: "2024-02-12",
    notes: "Negotiating contract terms.",
  },
  {
    id: 8,
    firstName: "Robert",
    lastName: "Hernandez",
    profilePicture:'https://userpic.codeforces.org/917400/title/b505abf135fb810e.jpg',
    title: "Operations Manager",
    companyName: "LogiTech Solutions",
    phone: "+1 999 888 777",
    companyPhone: "+1 999 888 777",
    email: "roberthernandez@example.com",
    leadStatusKey: 0, // Open
    owner: "Isabella Adams",
    address: "987 Spruce St, Denver, CO 80202",
    industry: "Logistics",
    createdAt: "2024-02-08",
    lastContacted: "2024-02-16",
    notes: "Considering new supply chain solutions.",
  },
  {
    id: 9,
    firstName: "Sophia",
    lastName: "Miller",
    profilePicture:'https://img.freepik.com/free-vector/smiling-young-man-with-glasses_1308-174435.jpg?ga=GA1.1.844967250.1740206090&semt=ais_hybrid',
    title: "Founder",
    companyName: "EcoFuture",
    phone: "+1 444 666 222",
    companyPhone: "+1 444 666 222",
    email: "sophiamiller@example.com",
    leadStatusKey: 3, // Unqualified
    owner: "Lucas White",
    address: "567 Oakwood St, Austin, TX 73301",
    industry: "Sustainable Energy",
    createdAt: "2023-12-30",
    lastContacted: "2024-01-25",
    notes: "Not interested in external funding.",
  },
  {
    id: 10,
    firstName: "Daniel",
    lastName: "Anderson",
    profilePicture:'https://img.freepik.com/free-photo/waist-up-isolated-picture-handsome-young-male-with-loose-curly-hairdo-smooth-clean-face-looking-sideways-with-thoughtful-dreamy-smile-human-facial-expressions-emotions-feelings_343059-1544.jpg?ga=GA1.1.844967250.1740206090&semt=ais_hybrid',
    title: "CTO",
    companyName: "NextGen Robotics",
    phone: "+1 111 222 333",
    companyPhone: "+1 111 222 333",
    email: "danielanderson@example.com",
    leadStatusKey: 4, // Closed
    owner: "Emma Watson",
    address: "159 Redwood St, San Diego, CA 92101",
    industry: "Robotics",
    createdAt: "2023-12-20",
    lastContacted: "2024-02-10",
    notes: "Signed contract for a 6-month project.",
  },
];
































