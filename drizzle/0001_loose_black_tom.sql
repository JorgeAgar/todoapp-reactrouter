CREATE TABLE `task` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`completedAt` numeric,
	`createdAt` numeric NOT NULL,
	`updatedAt` numeric NOT NULL,
	`deadline` numeric,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `task_userId_idx` ON `task` (`userId`);