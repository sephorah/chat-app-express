import prisma from "../../src/client";
import { createProfile, getProfile, getProfiles, updateProfile, deleteProfile, getProfileByUserId } from "../../src/models/profile";
import { createUser, getUser } from "../../src/models/user";

beforeAll(async () => {
    await prisma.user.deleteMany({ where: { username: { startsWith: "test_profile_" } } });
    await prisma.profile.deleteMany({ where: { name: { startsWith: "test_profile_" } } }); 
})

afterEach(async () => {
    await prisma.user.deleteMany({ where: { username: { startsWith: "test_profile_" } } });
    await prisma.profile.deleteMany({ where: { name: { startsWith: "test_profile_" } } });
});

describe("Profile model tests", () => {
    test("Create a new profile linked to an existing user", async () => {
        const user = await createUser({ username: "test_profile_Seph", password: "test" });
        const profile = await createProfile({ name: "test_profile_Seph", bio: "hey", userId: user.id, photoUrl: null  });

        expect(user).toStrictEqual({
            id: user.id,
            username: "test_profile_Seph",
            password: user.password,
            createdAt: user.createdAt
        })
        expect(profile).toStrictEqual({
            id: profile.id,
            name: "test_profile_Seph",
            bio: "hey",
            userId: user.id,
            photoUrl: null
        });
    });

    test("Get a specific profile", async () => {
        const user = await createUser({ username: "test_profile_Seph", password: "test" });
        const profile = await createProfile({ name: "test_profile_Seph", bio: "hey", userId: user.id, photoUrl: null  });
        const retrievedProfile = await getProfile(profile.id);

        expect(user.id).toBeDefined();
        expect(retrievedProfile).toStrictEqual({
            id: profile.id,
            name: "test_profile_Seph",
            bio: "hey",
            userId: user.id,
            photoUrl: null
        })
    });

    test("Get a specific user by username", async () => {
        const user = await createUser({ username: "test_profile_Seph", password: "test" });
        const profile = await createProfile({ name: "test_profile_Seph", bio: "hey", userId: user.id, photoUrl: null  });
        const retrievedProfile = await getProfileByUserId(user.id);

        expect(retrievedProfile).toStrictEqual({
            id: profile.id,
            name: "test_profile_Seph",
            bio: "hey",
            userId: user.id,
            photoUrl: null
        })
    });

    test("Get profiles", async () => {
        const user1 = await createUser({ username: "test_profile_Seph", password: "test" });
        const user2 = await createUser({ username: "test_profile_Toto", password: "test1" });
        await createProfile({ name: "test_profile_Seph", bio: "hey", userId: user1.id, photoUrl: null });
        await createProfile({ name: "test_profile_Toto", bio: "hi", userId: user2.id, photoUrl: null });
        const profiles = await getProfiles();

        expect(user1.id).toBeDefined();
        expect(user2.id).toBeDefined();
        expect(profiles).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "test_profile_Seph",
                    bio: "hey",
                    userId: user1.id,
                    photoUrl: null
                }),
                expect.objectContaining({
                    name: "test_profile_Toto",
                    bio: "hi",
                    userId: user2.id,
                    photoUrl: null
                }),
            ])
        );
    });

    test("Update a profile", async () => {
        const user = await createUser({ username: "test_profile_Seph", password: "test" });
        const profile = await createProfile({ name: "test_profile_Seph", bio: "hey", userId: user.id, photoUrl: null  });
        const updatedProfile = await updateProfile(profile.id, { name: "test_Tata", bio: "bonjour"});

        
        expect(updatedProfile).toStrictEqual({
            id: profile.id,
            name: "test_Tata",
            bio: "bonjour",
            userId: user.id,
            photoUrl: null
        });
    });

    test("Delete a profile", async () => {
        const user = await createUser({ username: "test_profile_Seph", password: "test" });
        const profile = await createProfile({ name: "test_profile_Seph", bio: "hey", userId: user.id, photoUrl: null  });
        const deletedProfile = await deleteProfile(profile.id);
        const retrievedProfile = await getUser(profile.id);

        expect(deletedProfile).toStrictEqual({
            id: profile.id,
            name: "test_profile_Seph",
            bio: "hey",
            userId: user.id,
            photoUrl: null
        });

        expect(retrievedProfile).toBe(null);
    });
});