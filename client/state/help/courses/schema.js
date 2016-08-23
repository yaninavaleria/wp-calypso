export const helpCoursesSchema = {
	type: 'object',
	additionalProperties: false,
	patternProperties: {
		'^\\d+$': {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					canRegister: { type: 'bool' },
					title: { type: 'string' },
					description: { type: 'string' },
					schedule: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								date: { type: 'string' },
								registrationUrl: { type: 'string' }
							}
						}
					},
					recent: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								date: { type: 'string' },
								video: { type: 'string' }
							}
						}
					}
				}
			}
		}
	}
};
