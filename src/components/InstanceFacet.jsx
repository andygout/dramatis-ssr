const InstanceFacet = props => {

	const { labelText, children } = props;

	return (
		<div className="instance-facet-wrapper">

			<div className="instance-facet-label">
				{ labelText }
			</div>

			<div className="instance-facet-content">
				{ children }
			</div>

		</div>
	);

};

export default InstanceFacet;
