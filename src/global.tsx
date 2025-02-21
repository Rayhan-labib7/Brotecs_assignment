import { Book, Calendar, Calendar2, Wallet3 } from 'iconsax-react';

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

interface BaseEntity {
  firstName: string;
  lastName: string;
  title: string;
  companyName: string;
  phone: string;
  email: string;
  owner: string;
}
export interface AccessControl {
  read: boolean;
  write: boolean;
  delete: boolean;
}

export interface TableData {
  // children: any[];
  // leadStatus: string;
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  companyName: string;
  phone: string;
  email: string;
  owner: string;
  company: string;
  name: string;
  companyPhone: string;
  leadStatusKey: number;
  address: string;
  industry: string;
  createdAt: string;
  lastContacted: string;
  notes: string
}

export const tableData: TableData[] = [
  {
    id: 1,
    firstName: 'John Doe',
    lastName: 'Doe',
    company: 'Tech Corp',
    name: 'John Doe',
    phone: '+1 123 456 7890',
    title: 'Software Engineer',
    companyName: 'Tech Corp',
    companyPhone: '+1 234 567 890',
    email: 'johndoe@example.com',
    leadStatusKey: 1, // Contacted
    owner: 'Alice Smith',

    address: '123 Main St, New York, NY 10001',
    industry: 'Technology',
    createdAt: '2024-02-01',
    lastContacted: '2024-02-15',
    notes: 'Follow-up scheduled next week.',

  },
  {
    id: 2,
    firstName: 'Jane Smith',
    lastName: 'Doe',
    company: 'Tech Corp',
    name: 'John Doe',
    phone: '+1 123 456 7890',
    title: 'Marketing Manager',
    companyName: 'Biz Solutions',
    companyPhone: '+1 987 654 321',
    email: 'janesmith@example.com',
    leadStatusKey: 2, // Qualified
    owner: 'Bob Johnson',

    address: '456 Oak St, Los Angeles, CA 90012',
    industry: 'Marketing',
    createdAt: '2024-01-20',
    lastContacted: '2024-02-10',
    notes: 'Interested in premium package.',

  },
  {
    id: 3,
    firstName: 'Michael Lee',
    lastName: 'Doe',
    company: 'Tech Corp',
    name: 'John Doe',
    phone: '+1 123 456 7890',
    title: 'Product Manager',
    companyName: 'StartupX',
    companyPhone: '+1 555 999 888',
    email: 'michaellee@example.com',
    leadStatusKey: 0, // Open
    owner: 'Emma Wilson',
    address: '789 Pine St, San Francisco, CA 94103',
    industry: 'SaaS',
    createdAt: '2024-01-10',
    lastContacted: '2024-02-05',
    notes: 'Demo scheduled for next month.',
  },
  {
    id: 4,
    firstName: 'David Brown',
    lastName: 'Doe',
    company: 'Tech Corp',
    name: 'John Doe',
    phone: '+1 123 456 7890',
    title: 'HR Manager',
    companyName: 'PeopleFirst HR',
    companyPhone: '+1 333 777 555',
    email: 'davidbrown@example.com',
    leadStatusKey: 3, // Unqualified
    owner: 'Sophia Martinez',
    address: '890 Willow St, Chicago, IL 60601',
    industry: 'Human Resources',
    createdAt: '2024-01-05',
    lastContacted: '2024-01-20',
    notes: 'Not looking for new services at the moment.',

  },
  {
    id: 5,
    firstName: 'Emily Davis',
    lastName: 'Doe',
    company: 'Tech Corp',
    name: 'John Doe',
    phone: '+1 123 456 7890',
    title: 'CEO',
    companyName: 'FutureVision AI',
    companyPhone: '+1 888 222 111',
    email: 'emilydavis@example.com',
    leadStatusKey: 4, // Closed
    owner: 'Daniel Thompson',
    address: '321 Maple St, Seattle, WA 98101',
    industry: 'Artificial Intelligence',
    createdAt: '2023-12-15',
    lastContacted: '2024-01-30',
    notes: 'Signed a deal, project in progress.',
  },
  {
    id: 6,
    firstName: 'Chris Wilson',
    lastName: 'Doe',
    company: 'Tech Corp',
    name: 'John Doe',
    phone: '+1 123 456 7890',
    title: 'CFO',
    companyName: 'FinTech Innovators',
    companyPhone: '+1 777 444 333',
    email: 'chriswilson@example.com',
    leadStatusKey: 2, // Qualified
    owner: 'Jessica Clark',
    address: '654 Cedar St, Boston, MA 02108',
    industry: 'Finance',
    createdAt: '2024-02-05',
    lastContacted: '2024-02-18',
    notes: 'Exploring investment opportunities.'
  },
  {
    id: 7,
    firstName: 'Olivia Taylor',
    lastName: 'Doe',
    company: 'Tech Corp',
    name: 'John Doe',
    phone: '+1 123 456 7890',
    title: 'Sales Director',
    companyName: 'Retail Hub',
    companyPhone: '+1 666 555 444',
    email: 'oliviataylor@example.com',
    leadStatusKey: 1, // Contacted
    owner: 'James Roberts',
    address: '432 Birch St, Miami, FL 33101',
    industry: 'Retail',
    createdAt: '2024-01-28',
    lastContacted: '2024-02-12',
    notes: 'Negotiating contract terms.'
  },
  {
    id: 8,
    firstName: 'Robert Hernandez',
    lastName: 'Doe',
    company: 'Tech Corp',
    name: 'John Doe',
    phone: '+1 123 456 7890',
    title: 'Operations Manager',
    companyName: 'LogiTech Solutions',
    companyPhone: '+1 999 888 777',
    email: 'roberthernandez@example.com',
    leadStatusKey: 0, // Open
    owner: 'Isabella Adams',
    address: '987 Spruce St, Denver, CO 80202',
    industry: 'Logistics',
    createdAt: '2024-02-08',
    lastContacted: '2024-02-16',
    notes: 'Considering new supply chain solutions.'
  },
  {
    id: 9,
    firstName: 'Sophia Miller',
    lastName: 'Doe',
    company: 'Tech Corp',
    name: 'John Doe',
    phone: '+1 123 456 7890',
    title: 'Founder',
    companyName: 'EcoFuture',
    companyPhone: '+1 444 666 222',
    email: 'sophiamiller@example.com',
    leadStatusKey: 3, // Unqualified
    owner: 'Lucas White',
    address: '567 Oakwood St, Austin, TX 73301',
    industry: 'Sustainable Energy',
    createdAt: '2023-12-30',
    lastContacted: '2024-01-25',
    notes: 'Not interested in external funding.'
  },
  {
    id: 10,
    firstName: 'Daniel Anderson',
    lastName: 'Doe',
    company: 'Tech Corp',
    name: 'John Doe',
    phone: '+1 123 456 7890',
    title: 'CTO',
    companyName: 'NextGen Robotics',
    companyPhone: '+1 111 222 333',
    email: 'danielanderson@example.com',
    leadStatusKey: 4, // Closed
    owner: 'Emma Watson',
    address: '159 Redwood St, San Diego, CA 92101',
    industry: 'Robotics',
    createdAt: '2023-12-20',
    lastContacted: '2024-02-10',
    notes: 'Signed contract for a 6-month project.'
  },
];


export interface Task {
  id?: string;
  name: string;
  description: string;
  taskType: string;
  assignedTo: string;
  dueDate: string;
  status: string;
  contact_name?: string;
  relatedTo?: string;
  statusId?: string;
}
export type TaskData = {
  id?: string;
  name: string;
  description: string;
  taskType: string;
  assignedTo: string;
  dueDate: string;
  status: string;
  contact_name?: string;
  relatedTo?: string;
  statusId?: string;
};



export interface ProductData {
  name: string;
  description: string;
  image: string;
  productGroup: string;
  productCode: string;
  salesPrice: number;
  purchasePrice: number;
  unitOfMeasurement: number;
  currency: number;
  id?: string;
}
export interface DropdownChildData {
  id: number;
  name: string;
  label?: string;
  textColor?: string;
  bgColor?: string;
  parentId?: number;
  typeId?: number;
  parent_item_id?: number;
  index: number;
  child?: {
    id?: number;
    name?: string;
    parent?: number;
    child?: number;
  };
}

export interface ContactInformation extends BaseEntity {
  id: string;
  linkTitleTypeKey: number;
}

export interface OpportunityInformation extends BaseEntity {
  opportunityName: string;
  expectedYearRevenueGain: string;
  stage: Stage;
  id: string;
  company: string;
  points: string;
  website: string;
  customerRequirements: string;
  postalCode: string;
  companyPhone: string;
  competitors: string;
  street: string;
  state: string;
  city: string;
  opportunityStatus: number;
  opportunityScore: number;
  industry: number;
  amountEmployees: number;
  balance: number;
  lastYearProfit: number;
  companyRevenue: number;
  powerOfContact: number;
}
export type OpportunityInformationRowData = {
  opportunityName: string;
  stage: Stage;
  id: number;
  company: string;
  website: string;
  companyPhone: string;
  street: string;
  state: string;
  city: string;
  opportunityStatusId: number;
  firstName: string;
  lastName: string;
  title: string;
  companyName: string;
  phone: string;
  email: string;
  owner: string;
};

export type ContactDetail = {
  label: string;
  value: string;
  badgeText?: string;
};
export type TaskDetail = {
  id?: string;
  taskName: string;
  contactName: string;
  dueDate: string;
  description: string;
  taskType: number;
  assignedTo: number;
  taskStatus: number;
  relatedTo: number;
};

export interface LeadPostData {
  contactId: string;
  postalCode: string;
  leadStatus: number;
  industry: number;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  companyName: string;
  companyLogo: string;
  website: string;
  companyEmail: string;
  companyPhone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: number;
  productKey: string;
  timelineFrom: string;
  timelineTo: string;
  competitor: string;
  customerRequirement: string;
  needs: string;
  companySize: number;
  estimatedBudget: number;
  notes: string;
  name: string;
  description: string;
  productCode: string;
  productGroup: string;
  unitOfMeasurement: string;
  salesPrice: number;
  purchasePrice: number;
  currency: string;
  image: string;
}
export type LeadRowData = {
  contactId: string;
  postalCode: string;
  leadStatus: number;
  industry: number;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  companyName: string;
  companyLogo: string;
  website: string;
  companyEmail: string;
  companyPhone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: number;
  productKey: string;
  timelineFrom: string;
  timelineTo: string;
  competitor: string;
  customerRequirement: string;
  needs: string;
  companySize: number;
  estimatedBudget: number;
  notes: string;
  name: string;
  description: string;
  productCode: string;
  productGroup: string;
  unitOfMeasurement: string;
  salesPrice: number;
  purchasePrice: number;
  currency: string;
  image: string;
};

export interface Todo {
  comments: string;
  description: string;
  dtDate: string;
  dttAdded: string;
  dttMod: string;
  actionKey: number;
  envKey: number;
  idx: number;
  stateKey: number;
  todoVer: number;
  isActive: boolean;
  lastUpdated: string;
  allocatedTo: string;
  assign: string;
  assignedBy: string;
  assignedByFullName: string;
  assignmentRule: string;
  color: string;
  likedBy: string;
  name: string;
  priority: string;
  referenceName: string;
  referenceType: string;
  role: string;
  seen: string;
  sender: string;
  status: string;
  userAdded: string;
  userMod: string;
  userTags: string;
}

export const sampleEntries = [
  {
    date: '2024-12-06',
    time: '10:00 AM',
    user: {
      name: 'John Doe',
      avatar: 'https://userpic.codeforces.org/917400/title/b505abf135fb810e.jpg',
    },
    activity: 'commented on your profile',
    comment: 'Great job on completing the task!',
  },
  {
    date: '2024-12-05',
    time: '3:45 PM',
    user: {
      name: 'Jane Smith',
      avatar: 'https://userpic.codeforces.org/917400/title/b505abf135fb810e.jpg',
    },
    activity: 'commented on your task',
    comment: 'Please update the description for clarity.',
  },
  {
    date: '2024-12-04',
    time: '1:15 PM',
    user: {
      name: 'Alex Brown',
      avatar: 'https://userpic.codeforces.org/917400/title/b505abf135fb810e.jpg',
    },
    activity: 'edited this task',
    comment: '',
  },
];

// Insights Data
const chartData = [10, 30, 40, 20, 60, 50, 20, 15, 20, 25, 30, 25];

export const insightsData = [
  {
    title: 'All Earnings',
    value: '$3000',
    percentageChange: '30.6',
    chartData: chartData,
    color: '#e9f0ff80',
    icon: <Wallet3 className="text-nps-blue text-2xl" />,
    textColor: '#4680ff',
  },
  {
    title: 'Page Views',
    value: '290+',
    percentageChange: '-30.6',
    chartData: chartData,
    color: '#f7dcb380',
    icon: <Book className="text-nps-yellow text-2xl" />,
    textColor: '#e58a00',
  },
  {
    title: 'Total Task',
    value: '1,568',
    percentageChange: '30.6',
    chartData: chartData,
    color: '#c0e5d980',
    icon: <Calendar2 className="text-nps-green text-2xl" />,
    textColor: '#2ca87f',
  },
  {
    title: 'Download',
    value: '$200',
    percentageChange: '-30.6',
    chartData: chartData,
    color: '#f5bebe80',
    icon: <Calendar className="text-nps-red text-2xl" />,
    textColor: '#dc2626',
  },
];

// Define the type for Contact data
export type Contact = {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  industryTypeKey: string;
  contractTypeKey: string;
  companyName: string;
  linkTitleTypeKey: number;
  id: string;
};

export interface RolesAndPermision {
  id: number;
  global: boolean;
  sort: number;
  role: string;
}
export interface ProductInformation {
  name: string;
  description: string;
}

export interface PaginationData {
  page: number;
  size: number;
  totalPages: number;
}

export const leadDummyData = {
  status: 'SUCCESS',
  message: 'Lead data has been retrieved successfully.',
  data: {
    items: [
      {
        id: '048251eb-5ef3-4185-81f3-4c57a33485cc',
        contactId: '97153c4a-2d57-47ca-819e-199bd0d83563',
        leadStatusKey: 2,
        industryTypeKey: 1,
        firstName: 'gtsdgere',
        lastName: 'sgs',
        title: 'sgsg d',
        email: 'tanveer.hossain@bedatasolutions.com',
        phone: '01980067767',
        companyName: 'Innovative fashion',
        companyLogo: 'string',
        website: 'sgs',
        companyEmail: 'tanveer.hossain@bedatasolutions.com',
        companyPhone: '01980067767',
        street: 'Test 12/13 Liverpool',
        city: 'London',
        state: '3535',
        zipCode: '1212',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T12:30:05.217',
        timelineTo: '2025-01-29T12:30:05.217',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: '',
      },
      {
        id: '282b71e3-a028-4d00-82d0-0192705138d7',
        contactId: '97153c4a-2d57-47ca-819e-199bd0d83563',
        leadStatusKey: 3,
        industryTypeKey: 3,
        firstName: 'Ridoy - update cjc;l',
        lastName: 'Kumar Joy',
        title: 'Ridoy Lead 1',
        email: 'ridoy.kumar@bedata.com',
        phone: '01625780988',
        companyName: 'Bedata3',
        companyLogo: 'string',
        website: 'www.Bedata.com',
        companyEmail: 'ridoy.kumar@bedatasolutions.com',
        companyPhone: '01625',
        street: '18/3 (3rd Floor), Ring Road, Block F, Mohammadpur, Dhaka, Bangladesh',
        city: 'Dhaka',
        state: 'Dhaka',
        zipCode: '25',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T12:30:05.217',
        timelineTo: '2025-01-29T12:30:05.217',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: '',
      },
      {
        id: '22a779e4-1790-43f1-98f7-5f1518d08662',
        contactId: '97153c4a-2d57-47ca-819e-199bd0d83563',
        leadStatusKey: 3,
        industryTypeKey: 2,
        firstName: 'a',
        lastName: 'gjh',
        title: '',
        email: '',
        phone: '78',
        companyName: '',
        companyLogo: 'string',
        website: 'jhg',
        companyEmail: 'gfdgfd@gmail.com',
        companyPhone: '',
        street: 'hgf',
        city: 'fhg',
        state: 'hjk',
        zipCode: 'hf',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T12:30:05.217',
        timelineTo: '2025-01-29T12:30:05.217',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: '',
      },
      {
        id: '4087b011-2c02-4243-b3aa-33720bedcdf3',
        contactId: '97153c4a-2d57-47ca-819e-199bd0d83563',
        leadStatusKey: 1,
        industryTypeKey: 2,
        firstName: 'jg',
        lastName: 'gjh',
        title: 'klj',
        email: 'gfdgfd@gmail.com',
        phone: 'lkjlk',
        companyName: 'yut',
        companyLogo: 'string',
        website: 'jlk',
        companyEmail: 'gfdgfd@gmail.com',
        companyPhone: 'lkj',
        street: 'hgf',
        city: 'fhg',
        state: 'lkj',
        zipCode: 'hf',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T12:30:05.217',
        timelineTo: '2025-01-29T12:30:05.217',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: '',
      },
      {
        id: '61416d10-9d96-4179-a9e1-46a4d29486c6',
        contactId: '97153c4a-2d57-47ca-819e-199bd0d83563',
        leadStatusKey: 3,
        industryTypeKey: 4,
        firstName: 'jg',
        lastName: 'gjh',
        title: 'olik;',
        email: 'gfdgfd@gmail.com',
        phone: 'lkj',
        companyName: 'yut',
        companyLogo: 'string',
        website: 'klj',
        companyEmail: 'gfdgfd@gmail.com',
        companyPhone: 'klj',
        street: 'hgf',
        city: 'fhg',
        state: 'lkj',
        zipCode: 'hf',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T12:30:05.217',
        timelineTo: '2025-01-29T12:30:05.217',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: '',
      },
      {
        id: 'c8768b92-7103-481c-9db9-01ed71cd172e',
        contactId: '97153c4a-2d57-47ca-819e-199bd0d83563',
        leadStatusKey: 3,
        industryTypeKey: 2,
        firstName: 'jg',
        lastName: 'gjh',
        title: 'likju',
        email: 'gfdgfd@gmail.com',
        phone: 'likj',
        companyName: 'yut',
        companyLogo: 'string',
        website: 'likj',
        companyEmail: 'gfdgfd@gmail.com',
        companyPhone: 'lkj',
        street: 'hgf',
        city: 'fhg',
        state: 'jklj',
        zipCode: 'hf',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T12:30:05.217',
        timelineTo: '2025-01-29T12:30:05.217',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: '',
      },
      {
        id: '63a2c6b9-2058-4042-882c-f6d8e27fb680',
        contactId: '97153c4a-2d57-47ca-819e-199bd0d83563',
        leadStatusKey: 2,
        industryTypeKey: 2,
        firstName: 'jg',
        lastName: 'gjh',
        title: 'tfg',
        email: 'gfdgfd@gmail.com',
        phone: 'fdghd',
        companyName: 'yut',
        companyLogo: 'string',
        website: 'tfg',
        companyEmail: 'gfdgfd@gmail.com',
        companyPhone: 'gfo',
        street: 'hgf',
        city: 'fhg',
        state: 'gfh',
        zipCode: 'hf',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T12:30:05.217',
        timelineTo: '2025-01-29T12:30:05.217',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: '',
      },
      {
        id: '428a06b4-3cb5-4086-a8a7-bd2c4b66e983',
        contactId: '510bea5a-6c9c-463b-9194-bc65cbed0542',
        leadStatusKey: 0,
        industryTypeKey: 0,
        firstName: 'string 40',
        lastName: 'string',
        title: 'string',
        email: 'string',
        phone: 'string',
        companyName: 'string',
        companyLogo: 'string',
        website: 'string',
        companyEmail: 'string',
        companyPhone: 'string',
        street: 'string',
        city: 'string',
        state: 'string',
        zipCode: 'string',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T06:10:33.167',
        timelineTo: '2025-01-29T06:10:33.167',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: 'string',
      },
      {
        id: 'c2d911ed-072f-4da5-97af-794cbd2dd50b',
        contactId: '510bea5a-6c9c-463b-9194-bc65cbed0542',
        leadStatusKey: 0,
        industryTypeKey: 0,
        firstName: 'string 4',
        lastName: 'string',
        title: 'string',
        email: 'string8',
        phone: 'string',
        companyName: 'string',
        companyLogo: 'string',
        website: 'string',
        companyEmail: 'string',
        companyPhone: 'string',
        street: 'string',
        city: 'string',
        state: 'string',
        zipCode: 'string',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T06:10:33.167',
        timelineTo: '2025-01-29T06:10:33.167',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: 'string',
      },
      {
        id: '10a34565-9f01-4bcf-a13a-9e2bd368cc5e',
        contactId: '510bea5a-6c9c-463b-9194-bc65cbed0542',
        leadStatusKey: 0,
        industryTypeKey: 0,
        firstName: 'string 3',
        lastName: 'string',
        title: 'string',
        email: 'string',
        phone: 'string',
        companyName: 'string',
        companyLogo: 'string',
        website: 'string',
        companyEmail: 'string',
        companyPhone: 'string',
        street: 'string',
        city: 'string',
        state: 'string',
        zipCode: 'string',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T06:10:33.167',
        timelineTo: '2025-01-29T06:10:33.167',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: 'string',
      },
      {
        id: '07933143-f21f-46ac-a04d-dc11d9568253',
        contactId: '510bea5a-6c9c-463b-9194-bc65cbed0542',
        leadStatusKey: 0,
        industryTypeKey: 0,
        firstName: 'string 2',
        lastName: 'string',
        title: 'string',
        email: 'string',
        phone: 'string',
        companyName: 'string',
        companyLogo: 'string',
        website: 'string',
        companyEmail: 'string',
        companyPhone: 'string',
        street: 'string',
        city: 'string',
        state: 'string',
        zipCode: 'string',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T06:10:33.167',
        timelineTo: '2025-01-29T06:10:33.167',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: 'string',
      },
      {
        id: 'eb00a596-cc15-445e-a9ad-eb128930e43a',
        contactId: '510bea5a-6c9c-463b-9194-bc65cbed0542',
        leadStatusKey: 0,
        industryTypeKey: 0,
        firstName: 'string',
        lastName: 'string',
        title: 'string',
        email: 'string',
        phone: 'string',
        companyName: 'string',
        companyLogo: 'string',
        website: 'string',
        companyEmail: 'string',
        companyPhone: 'string',
        street: 'string',
        city: 'string',
        state: 'string',
        zipCode: 'string',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-29T06:10:33.167',
        timelineTo: '2025-01-29T06:10:33.167',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: 'string',
      },
      {
        id: '07172c2b-6d67-402d-92ea-6d23a75b0b79',
        contactId: '97153c4a-2d57-47ca-819e-199bd0d83563',
        leadStatusKey: 0,
        industryTypeKey: 0,
        firstName: 'Update',
        lastName: 'Success',
        title: 'string',
        email: 'string',
        phone: 'string',
        companyName: 'string',
        companyLogo: 'string',
        website: 'string',
        companyEmail: 'string',
        companyPhone: 'string',
        street: 'string',
        city: 'string',
        state: 'string',
        zipCode: 'string',
        country: 0,
        productKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        timelineFrom: '2025-01-28T10:59:21.104',
        timelineTo: '2025-01-28T10:59:21.104',
        competitor: 'string',
        customerRequirement: 'string',
        needs: 'string',
        companySize: 0,
        estimatedBudget: 0.0,
        notes: 'string',
      },
    ],
    pagination: {
      page: 1,
      size: 20,
      totalPages: 1,
    },
  },
};
