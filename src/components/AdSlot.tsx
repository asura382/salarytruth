interface AdSlotProps {
  size: 'leaderboard' | 'rectangle' | 'banner';
  slotId?: string;
}

export default function AdSlot({ size, slotId }: AdSlotProps) {
  const dimensions = {
    leaderboard: { width: 728, height: 90 },
    rectangle: { width: 300, height: 250 },
    banner: { width: 468, height: 60 },
  };

  const containerStyle = {
    minHeight: `${dimensions[size].height}px`,
    background: '#f9f9f9',
    border: '1px dashed #ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      className="ad-slot w-full my-6"
      data-ad-slot={slotId || 'REPLACE_WITH_AD_SLOT_ID'}
      style={containerStyle}
    >
      <span style={{ color: '#999', fontSize: '12px' }}>Advertisement</span>
    </div>
  );
}
