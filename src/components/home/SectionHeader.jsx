import React from 'react';
import { Link } from 'react-router-dom';

const SectionHeader = ({ eyebrow, title, linkTo, linkLabel }) => (
  <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-5 mb-8 border-b-[3px] border-maynas-red">
    <div>
      <p className="mb-1 text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-maynas-red">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-maynas-navy">
        {title}
      </h2>
    </div>
    {linkTo && linkLabel && (
      <Link
        to={linkTo}
        className="group inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-maynas-navy hover:text-maynas-red transition-colors duration-200"
      >
        {linkLabel}
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>
    )}
  </div>
);

export default SectionHeader;
