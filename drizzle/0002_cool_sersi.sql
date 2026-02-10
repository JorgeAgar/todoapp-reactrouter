CREATE TABLE `subTask` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`completedAt` numeric,
	`createdAt` numeric NOT NULL,
	`updatedAt` numeric NOT NULL,
	`deadline` numeric,
	`parentTaskId` text NOT NULL,
	FOREIGN KEY (`parentTaskId`) REFERENCES `task`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `subTask_parentTaskId_idx` ON `subTask` (`parentTaskId`);