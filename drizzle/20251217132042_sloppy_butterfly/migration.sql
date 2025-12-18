CREATE TABLE "Category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "_CategoryToPost" (
	"A" uuid,
	"B" uuid,
	CONSTRAINT "_CategoryToPost_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "FireStore" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"mimeType" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "_FireStoreToPost" (
	"A" uuid NOT NULL,
	"B" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Post" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"published" boolean NOT NULL,
	"title" text DEFAULT 'New Post' NOT NULL,
	"content" text NOT NULL,
	"authorId" uuid NOT NULL,
	"cardId" text,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) DEFAULT now() NOT NULL,
	"publishedAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "System" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"iconId" text,
	"cardId" text,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" text NOT NULL UNIQUE,
	"name" text DEFAULT 'User' NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_A_Post_id_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_B_Category_id_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_FireStoreToPost" ADD CONSTRAINT "_FireStoreToPost_A_Post_id_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_FireStoreToPost" ADD CONSTRAINT "_FireStoreToPost_B_FireStore_id_fkey" FOREIGN KEY ("B") REFERENCES "FireStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_User_id_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Post" ADD CONSTRAINT "Post_cardId_FireStore_id_fkey" FOREIGN KEY ("cardId") REFERENCES "FireStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "System" ADD CONSTRAINT "System_iconId_FireStore_id_fkey" FOREIGN KEY ("iconId") REFERENCES "FireStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "System" ADD CONSTRAINT "System_cardId_FireStore_id_fkey" FOREIGN KEY ("cardId") REFERENCES "FireStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;