module.exports = eris => {
	Object.defineProperty(eris.Member.prototype, "highestRole", {
		get: function() {
			if(this.roles.length == 0) return this.guild.roles.get(this.guild.id);
			else return this.roleObjects.reduce((prev, role) => !prev || role.higherThan(prev) ? role : prev);
		}
    });
    
    Object.defineProperty(eris.Member.prototype, "roleObjects", {
		get: function() {
			return this.roles.map(roleID => this.guild.roles.get(roleID));
		}
    });
    
    eris.Member.prototype.punishable = function(member2) {
		if(this.id === member2.id) return false;
		else if(this.id === this.guild.ownerID) return false;
		else if(member2.id === this.guild.ownerID) return true;
		else return !this.highestRole.higherThan(member2.highestRole);
    };
    
    Object.defineProperty(eris.Member.prototype, "kickable", {
		get: function() {
			const clientMember = this.guild.members.get(this.guild.shard.client.user.id);
			return clientMember.permission.has("kickMembers") && this.punishable(clientMember);
		}
    });
    
    Object.defineProperty(eris.Member.prototype, "bannable", {
		get: function() {
			const clientMember = this.guild.members.get(this.guild.shard.client.user.id);
			return clientMember.permission.has("banMembers") && this.punishable(clientMember);
		}
    });
    
    Object.defineProperty(eris.Member.prototype, 'activeName', {
		get: function() {
			return this.nick || this.username;
		}
	});

	Object.defineProperty(eris.Member.prototype, "tag", {
        get: function() {
            return `${this.username}#${this.discriminator}`
        }
    })
};