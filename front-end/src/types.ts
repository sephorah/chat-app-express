export type UserData = (Profile)[][number];

export type LoggedInUserData = (Profile)

// export interface Message {
//     id: number;
//     avatar: string;
//     name: string;
//     message: string;
// }

// export interface User {
//     id: number;
//     avatar: string;
//     messages?: Message[];
//     name: string;
// }


export const loggedInProfile: Profile = {
    id: "jakob-profile",
    name: 'Jakob Hoeg',
    photoUrl: 'https://github.com/shadcn.png',
    bio: "hey",
};

export const loggedInUser: User = {
    id: "jakob-user",
    username: "jakob-1",
    password: "toto",
    createdAt: new Date(),
};

export const listProfiles: Profile[] = [
    {
        id: "john-profile",
        name: 'John Doe',
        photoUrl: 'https://github.com/shadcn.png',
        bio: "hey",
    },
    {
        id: "elizabeth-profile",
        name: 'Elizabeth Smith',
        photoUrl: 'https://github.com/shadcn.png',
        bio: "hola",
    },
    {
        id: "smith-profile",
        name: 'John Smith',
        photoUrl: 'https://github.com/shadcn.png',
        bio: "hey",
    }
]

export const listChatrooms: Chatroom[] = [
    {
        id: "1",
        name: "Test Chatroom",
        createdAt: new Date(),
        members: [listProfiles[0], listProfiles[1], loggedInProfile],
        messages: [
            {
                id: "1",
                createdAt: new Date(),
                body: 'Hey, Jakob',
                read: false,
                senderId: listProfiles[0].id,
                senderName: listProfiles[0].name
            },
            {
                id: "2",
                createdAt: new Date(),
                body: 'Hey!',
                read: false,
                senderId: loggedInProfile.id,
                senderName: loggedInProfile.name
            },
            {
                id: "3",
                createdAt: new Date(),
                body: 'How are you all?',
                read: false,
                senderId: listProfiles[1].id,
                senderName: listProfiles[1].name
            },
            {
                id: "4",
                createdAt: new Date(),
                body: 'I am good, you?',
                read: false,
                senderId: loggedInProfile.id,
                senderName: loggedInProfile.name
            },
        ]
    },
    {
        id: "2",
        name: "Test Chatroom 2",
        createdAt: new Date(),
        members: [loggedInProfile],
        messages: [
        ]
    },
    {
        id: "3",
        name: "Test Chatroom 3",
        createdAt: new Date(),
        members: [loggedInProfile, listProfiles[1]],
        messages: [
        ]
    },
    {
        id: "4",
        name: "Test Chatroom 4",
        createdAt: new Date(),
        members: [loggedInProfile, listProfiles[0]],
        messages: [
        ]
    },
];


export interface User {
    id: string,
    username: string,
    password: string,
    createdAt: Date,
    profile?: Profile
}

export interface Profile {
    id: string,
    name: string,
    photoUrl?: string,
    bio: string,
}

export interface Chatroom {
    id: string,
    name: string,
    createdAt: Date,
    members: Profile[],
    messages: Message[],
    photoUrl?: string
}

export interface Message {
    id: string,
    createdAt: Date,
    body: string,
    read: boolean,
    senderId: string,
    senderName: string
}