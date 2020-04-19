import React from 'react';

import { InstanceLink, JoinedRoles } from '.';

export default function (props) {

	return (
		<ul className="list">
			{
				props.instances.map((instance, index) => (
					<li key={index}>

						<InstanceLink instance={instance} />

						{
							instance.theatre && (
								<React.Fragment>

									<span>&nbsp;-&nbsp;</span>

									<InstanceLink instance={instance.theatre} />

								</React.Fragment>
							)
						}

						{
							instance.roles && instance.roles.length && (
								<React.Fragment>

									<span>&nbsp;…&nbsp;</span>

									<JoinedRoles instances={instance.roles} />

								</React.Fragment>
							)
						}

						{
							instance.performers && instance.performers.length && (
								<React.Fragment>

									<span>&nbsp;- performed by:&nbsp;</span>

									{
										instance.performers
											.map((performer, index) =>
												<React.Fragment key={index}>

													<React.Fragment>

														<InstanceLink instance={performer} />

														<span>&nbsp;…&nbsp;</span>

														<span className="role-text">{performer.role.name}</span>

													</React.Fragment>

													{
														performer.otherRoles.length > 0 && (
															<React.Fragment>

																<span>; also performed:&nbsp;</span>

																<JoinedRoles instances={performer.otherRoles} />

															</React.Fragment>
														)
													}

												</React.Fragment>
											)
											.reduce((prev, curr) => [prev, ' / ', curr])
									}

								</React.Fragment>
							)
						}

					</li>
				))
			}
		</ul>
	);

};
