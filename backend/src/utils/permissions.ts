import { Note, User } from "@prisma/client";

type MaybeUser = Pick<User, "id"> | null;
type MaybeNote = Pick<Note, "authorId"> | null;

export const canEditNote = (user: MaybeUser, note: MaybeNote) => {
  return !!user && !!note && note.authorId === user.id;
};
