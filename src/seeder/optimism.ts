const EOA_MAP = {
  StateRootProposer: '0x473300df21d047806a082244b417f96b32f13a33',
  Sequencer: '0x6887246668a3b87f54deb3b94ba47a6f63f32985',
};

// const EOA_MAP = new Map([
//   ['StateRootProposer', '0xbe5dab4a2e9cd0f27300db4ab94bee3a233aeb19'],
//   ['Sequencer', '0x6887246668a3b87f54deb3b94ba47a6f63f32985'],
// ]);

const CONTRACT_MAP = {
  CanonicalTransactionChain: '0x5e4e65926ba27467555eb562121fac00d24e9dd2',
  StateCommitmentChain: '0xbe5dab4a2e9cd0f27300db4ab94bee3a233aeb19',
  Gateway: '0x99c9fc46f92e8a1c0dec1b1747d010903e884be1',
  L1CrossDomainMessenger: '0x25ace71c97b33cc4729cf772ae268934f7ab5fa1',
  TeleportrDeposit: '0x52ec2f3d7c5977a8e558c8d9c6000b615098e8fc',
};

// const x = new Map([

// ])

const RELATIONSHIPS = [
  {
    label: 'appendSequencerBatch',
    from: EOA_MAP['Sequencer'],
    to: CONTRACT_MAP['CanonicalTransactionChain'],
    // https://etherscan.io/tx/0xab0f29b55f974f571e26153158b11b80f8a1bd51371fdfdefb03f86aa91bf5ff
  },
  {
    label: 'appendStateBatch',
    from: EOA_MAP['StateRootProposer'],
    to: CONTRACT_MAP['StateCommitmentChain'],
    // https://etherscan.io/tx/0x7217e761d033247d929f2cf924e547542578bd3429fe792c38c1c53fc9e1cd82
  },
];

export { EOA_MAP, CONTRACT_MAP, RELATIONSHIPS };
