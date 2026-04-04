class ProfileState {
	followedIds: string[] = $state([]);

	isFollowing(id: string): boolean {
		return this.followedIds.includes(id);
	}

	toggleFollow(userId: string) {
		if (this.followedIds.includes(userId)) {
			this.followedIds = this.followedIds.filter((x) => x !== userId);
		} else {
			this.followedIds = [...this.followedIds, userId];
		}
	}
}

export const profile = new ProfileState();
