import prisma from "../src/client";
import { createProfile, getProfile, getProfiles, updateProfile, deleteProfile } from "../src/models/profile";
import { createUser, getUser } from "../src/models/user";

afterEach(() => {
    prisma.user.deleteMany({ where: { username: { startsWith: "test_" } } });
    prisma.profile.deleteMany({ where: { name: { startsWith: "test_" } } });
});

describe("Profile model tests", () => {
    test("Create a new profile linked to an existing user", async () => {
        const user = await createUser({ username: "test_Seph", password: "test" });
        const profile = await createProfile({ name: "test_Seph", bio: "hey", userId: user.id });

        expect(profile).toStrictEqual({
            id: profile.id,
            name: "test_Seph",
            bio: "hey",
            userId: user.id
        });
    });

    test("Create a new profile linked to an non-existing user", async () => {
        const profile = await createProfile({ name: "test_Seph", bio: "hey", userId: "tata" });

        expect(profile).toBe(null);
    });


    test("Get a specific profile", async () => {
        const user = await createUser({ username: "test_Seph", password: "test" });
        const profile = await createProfile({ name: "test_Seph", bio: "hey", userId: user.id });
        const retrievedProfile = await getProfile(profile.id);

        expect(retrievedProfile).toStrictEqual({
            id: profile.id,
            name: "test_Seph",
            bio: "hey",
            userId: user.id
        })
    });

    test("Get profiles", async () => {
        const user1 = await createUser({ username: "test_Seph", password: "test" });
        const user2 = await createUser({ username: "test_Toto", password: "test1" });
        await createProfile({ name: "test_Seph", bio: "hey", userId: user1.id });
        await createProfile({ name: "test_Toto", bio: "hi", userId: user2.id });
        const profiles = await getProfiles();

        expect(profiles).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "test_Seph",
                    bio: "hey",
                    userId: user1.id
                }),
                expect.objectContaining({
                    name: "test_Toto",
                    bio: "hi",
                    userId: user2.id
                }),
            ])
        );
    });

    test("Update a profile", async () => {
        const user = await createUser({ username: "test_Seph", password: "test" });
        const profile = await createProfile({ name: "test_Seph", bio: "hey", userId: user.id });
        const updatedProfile = await updateProfile(profile.id, { name: "test_Tata", bio: "bonjour"});

        expect(updatedProfile).toStrictEqual({
            id: profile.id,
            name: "test_Tata",
            bio: "bonjour",
            userId: user.id
        });
    });

    test("Delete a profile", async () => {
        const user = await createUser({ username: "test_Seph", password: "test" });
        const profile = await createProfile({ name: "test_Seph", bio: "hey", userId: user.id });
        const deletedProfile = await deleteProfile(profile.id);
        const retrievedProfile = await getUser(profile.id);

        expect(deletedProfile).toStrictEqual({
            id: profile.id,
            name: "test_Seph",
            bio: "hey",
            userId: user.id
        });

        expect(retrievedProfile).toBe(null);
    });
});